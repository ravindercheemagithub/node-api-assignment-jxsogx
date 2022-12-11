import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString } from 'class-validator';
import { CurrencyCode } from '../entity/currencyCode.enum';

export class CurrencyConverterDto {
  @ApiProperty({
    description: 'From Currency code',
    type: CurrencyCode,
  })
  @IsEnum(CurrencyCode, {
    message: 'from should be allowed currency code value',
  })
  from: CurrencyCode;

  @ApiProperty({
    description: 'To Currency code',
    type: CurrencyCode,
  })
  @IsEnum(CurrencyCode, { message: 'to should be allowed currency code value' })
  to: CurrencyCode;

  @ApiProperty({
    description: 'Amount to be converted',
  })
  @IsNumberString()
  amount: number;
}
