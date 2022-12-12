import { CurrencyResponseDto } from './dto/currency-response.dto';
import { ErrorCode } from './../constants/error';
import {
  Body,
  Controller,
  Get,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyConverterDto } from './dto/currency-converter.dto';
import { Observable, of, map } from 'rxjs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RedisService } from '../redis/redis.service';
import * as util from 'util';

@ApiTags('currency')
@Controller('currency')
@UseGuards(AuthGuard())
//@UseInterceptors(CacheInterceptor)
export class CurrencyController {
  constructor(
    private currencyService: CurrencyService,
    private readonly redisService: RedisService,
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
    return {
      errorCode: ErrorCode.SUCCESS.CODE,
      data: rate,
    };
  }
}
