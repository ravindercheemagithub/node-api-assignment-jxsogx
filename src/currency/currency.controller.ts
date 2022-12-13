import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from '../redis/redis.service';
import { ErrorCode } from './../constants/error';
import { CurrencyService } from './currency.service';
import { CurrencyConverterDto } from './dto/currency-converter.dto';

@ApiTags('currency')
@Controller('currency')
@UseGuards(AuthGuard())
//@UseInterceptors(CacheInterceptor)
export class CurrencyController {
  constructor(
    private currencyService: CurrencyService,
    private readonly redisService: RedisService,
    @InjectPinoLogger(CurrencyController.name)
    private readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Currency convertor' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Currency has been successfully converted' })
  @ApiUnauthorizedResponse({
    description: 'Please provide correct username/password',
  })
  @Get('/converter')
  async converter(@Query() currencyConverterDto: CurrencyConverterDto) {
    const rate = await this.currencyService.convert(currencyConverterDto);

    const response = {
      errorCode: ErrorCode.SUCCESS.CODE,
      data: rate,
    };
    //this.logger.assign({ additionalInfo: JSON.stringify(response) });
    this.logger.info(`additionalInfo: ${JSON.stringify(response)}`);
    return response;
  }
}
