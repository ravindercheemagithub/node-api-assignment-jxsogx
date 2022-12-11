import { CurrencyResponseDto } from './dto/currency-response.dto';
import { ErrorCode } from './../constants/error';
import { Body, Controller, Get, Query, Res } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyConverterDto } from './dto/currency-converter.dto';
import { Observable, of, map } from 'rxjs';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Get('/converter')
  converter(
    @Query() currencyConverterDto: CurrencyConverterDto,
    @Res() res: CurrencyResponseDto,
  ): Observable<CurrencyResponseDto> {
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
