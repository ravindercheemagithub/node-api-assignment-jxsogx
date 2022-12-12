import { Injectable, NestMiddleware } from '@nestjs/common';
import * as RateLimit from 'express-rate-limit';
import { ConfigService } from '../../config/config.service';
import moment from 'moment';

const WINDOW_SIZE_IN_HOURS = 24;
const MAX_WINDOW_REQUEST_COUNT = 100;
const WINDOW_LOG_INTERVAL_IN_HOURS = 1;

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private rateLimit: any;

  constructor(private readonly configService: ConfigService) {
    this.rateLimit = RateLimit.rateLimit({
      windowMs: isWeekend
        ? this.configService.server.weekend.rateLimitWindowMs
        : this.configService.server.weekday.rateLimitWindowMs,
      max: isWeekend
        ? this.configService.server.weekend.rateLimitMax
        : this.configService.server.weekday.rateLimitMax,
    });
  }

  use(request: Request, response: Response, next: () => void) {
    const req: any = request;
    const res: any = response;

    this.rateLimit(req, res, next);
  }
}

const isWeekend: boolean = new Date().getDay() % 6 == 0;
