import { CurrencyType } from './currencyType.enum';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CurrencyCode } from './CurrencyCode.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEnum(CurrencyType)
  type: CurrencyType;

  @Column()
  @IsEnum(CurrencyCode, {
    message: 'code should be from allowed values and in proper format eg BTC',
  })
  code: CurrencyCode;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  amount: number;
}
