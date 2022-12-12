import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as LocalConfigModule } from 'src/config/config.module';
import { UserModule } from 'src/user/user.module';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { Currency } from './entity/Currency.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Currency]),
    HttpModule,
    UserModule,
    LocalConfigModule,
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
