import { IsEnum, IsNumberString } from 'class-validator';
import { CurrencyCode } from '../entity/currencyCode.enum';

export class CurrencyConverterDto {
  @IsEnum(CurrencyCode, {
    message: 'from should be allowed currency code value',
  })
  from: CurrencyCode;

  @IsEnum(CurrencyCode, { message: 'to should be allowed currency code value' })
  to: CurrencyCode;

  @IsNumberString()
  amount: number;
}
