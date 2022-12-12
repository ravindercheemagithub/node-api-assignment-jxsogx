import BaseConfig from './BaseConfig';

export class ServerConfig extends BaseConfig {
  readonly port: number;
  readonly weekday: { rateLimitWindowMs: number; rateLimitMax: number };
  readonly weekend: { rateLimitWindowMs: number; rateLimitMax: number };

  constructor(cfg) {
    super(cfg);
  }
}
