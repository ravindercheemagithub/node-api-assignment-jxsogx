import * as path from 'path';

const port = 3000;

export default {
  server: {
    port,
  },
  coinbase: {
    clientID: '',
    clientSecret: '',
    URL: 'https://api.coinbase.com/v2/exchange-rates?currency=',
  },
};
