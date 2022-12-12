import BaseConfig from './BaseConfig';

export class ServerConfig extends BaseConfig {
  readonly port: number;

  constructor(cfg) {
    super(cfg);
  }
}
