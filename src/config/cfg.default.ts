import * as path from 'path';

const port = 3000;

export default {
  server: {
    port,
    weekday: { rateLimitWindowMs: 24 * 60 * 60 * 1000, rateLimitMax: 100 },
    weekend: { rateLimitWindowMs: 24 * 60 * 60 * 1000, rateLimitMax: 200 },
  },
  coinbase: {
    clientID: '',
    clientSecret: '',
    URL: 'https://api.coinbase.com/v2/exchange-rates?currency=',
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    keyPrefix: 'mili:',
    family: 4,
    password: '',
    db: 0,
  },
};
