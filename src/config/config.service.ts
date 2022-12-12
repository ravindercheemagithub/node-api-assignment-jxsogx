import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import defaultJSON from './cfg.default';
import devJSON from './cfg.dev';
import prodJSON from './cfg.prod';
import { ServerConfig } from './type/ServerConfig';
import CoinbaseConfig from './type/CoinbaseConfig';

@Injectable()
export class ConfigService {
  readonly DEV = 'dev';
  readonly PROD = 'Prod';

  readonly env: string;
  readonly server: ServerConfig;
  readonly coinbase: CoinbaseConfig;

  constructor() {
    const envConfigMap = {
      dev: devJSON,
      prod: prodJSON,
    };
    if (envConfigMap[`${process.env.STAGE}`]) {
      _.merge(defaultJSON, envConfigMap[`${process.env.STAGE}`]);
      this.env = `${process.env.STAGE}`;
    } else {
      this.env = this.DEV;
    }
    this.server = new ServerConfig(defaultJSON.server);
    this.coinbase = new CoinbaseConfig(defaultJSON.coinbase);
  }
}
