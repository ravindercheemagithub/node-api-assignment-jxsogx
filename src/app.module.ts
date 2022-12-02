import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [AuthModule, CurrencyModule],
})
export class AppModule {}
