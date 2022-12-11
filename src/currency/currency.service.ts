import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    private httpService: HttpService,
  ) {}

  convert(currencyConverterDto: CurrencyConverterDto): Observable<number> {
    const { from, to, amount } = currencyConverterDto;
    const url = `https://api.coinbase.com/v2/exchange-rates?currency=${from}`;
    const res = rxjsfrom(
      this.httpService.get(url).pipe(
        map((convertedCurrency) => convertedCurrency.data.rates[to] * amount),
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ),
    );
    return res;
  }
}