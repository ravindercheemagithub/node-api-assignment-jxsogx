import { ErrorCode } from 'src/constants/error';
import { CurrencyServiceException } from './../core/exception/currency-service.exception';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CurrencyConverterDto } from './dto/currency-converter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entity/Currency.entity';
import {
  catchError,
  firstValueFrom,
  map,
  of,
  tap,
  from as rxjsfrom,
  Observable,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { AxiosError } from 'axios';
import { ConfigService as LocalConfigService } from 'src/config/config.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    private readonly httpService: HttpService,
    private readonly localConfigService: LocalConfigService,
    private readonly redisService: RedisService,
  ) {}

  async convert(currencyConverterDto: CurrencyConverterDto): Promise<number> {
    const { from, to, amount } = currencyConverterDto;
    const url = `${this.localConfigService.coinbase.URL}${from}`;

    let rates = await this.redisService.getRates(from);
    let exchangeRates: AxiosResponse;

    if (rates) {
      return Number(rates[to]) * amount;
    }

    try {
      exchangeRates = await this.httpService.get(url).toPromise();
    } catch {
      throw new CurrencyServiceException(
        {
          errorCode: ErrorCode.ERROR.CODE,
          message: ErrorCode.ERROR.MESSAGE,
        },
        500,
      );
    }
    await this.redisService.setRates(exchangeRates.data.data.rates);
    return exchangeRates.data.data.rates[to] * amount;
  }
}
