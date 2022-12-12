import BaseConfig from './BaseConfig';

export default class CoinbaseConfig extends BaseConfig {
  readonly URL: string;
  readonly clientID: string;
  readonly clientSecret: string;

  constructor(cfg) {
    super(cfg);
  }
}
