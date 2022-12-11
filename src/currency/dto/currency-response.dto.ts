import { ApiProperty } from '@nestjs/swagger';

export class CurrencyResponseDto {
  @ApiProperty({
    description: 'response status code',
  })
  errorCode: number;

  @ApiProperty({
    description: 'response amount',
    type: 'number',
  })
  data: number;
}
