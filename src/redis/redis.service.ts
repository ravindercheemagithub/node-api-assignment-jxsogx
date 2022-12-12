import { Currency } from './../currency/entity/currency.entity';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import * as util from 'util';
import * as _ from 'lodash';
import { User } from '../user/entity/user.entity';
import { ConfigService } from '../config/config.service';

class CacheKeys {
  readonly currencyCode: string = 'url:%s';
  // readonly signupCode: string = 'signupcode:%s';
  // readonly userToken: string = 'usertoken:%d';
  // readonly publishArticle: string = 'publisharticle:%d';
  // readonly categories: string = 'categories';
}

@Injectable()
export class RedisService {
  readonly client: Redis;
  readonly cacheKeys: CacheKeys;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis(this.configService.redis);
    this.cacheKeys = new CacheKeys();
  }

  async getRates(currencyCode): Promise<Record<string, string>> {
    const str = await this.client.get(this.cacheKeys.currencyCode);
    if (!str) {
      return null;
    }
    return JSON.parse(str);
  }

  async setRates(rates: Record<string, string>) {
    return await this.client.set(
      this.cacheKeys.currencyCode,
      JSON.stringify(rates),
      'EX',
      1 * 60 * 60,
    );
  }

  async setCache(key: string, value: string, expire: number) {
    return await this.client.set(key, value, 'EX', expire);
  }

  async getCache(key: string) {
    return await this.client.get(key);
  }

  async delCache(key: string) {
    return await this.client.del(key);
  }
}
