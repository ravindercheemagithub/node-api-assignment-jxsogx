import { CurrencyResponseDto } from './dto/currency-response.dto';
import { ErrorCode } from './../constants/error';
import { Body, Controller, Get, Query, Res } from '@nestjs/common';
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

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @ApiOperation({ summary: 'Currency convertor' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Currency has been successfully converted' })
  @ApiUnauthorizedResponse({
    description: 'Please provide correct username/password',
  })
  @Get('/converter')
  converter(
    @Query() currencyConverterDto: CurrencyConverterDto,
  ): Observable<CurrencyResponseDto> {
    console.log('currency controller >>>>>>>');
    return this.currencyService.convert(currencyConverterDto).pipe(
      map((amount) => {
        return {
          errorCode: ErrorCode.SUCCESS.CODE,
          data: amount,
        };
      }),
    );
  }
}
