import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { CurrencyModule } from './currency/currency.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from 'config.schema';
import { UserModule } from './user/user.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule as LocalConfigModule } from './config/config.module';
import { ConfigService as LocalConfigService } from './config/config.service';
import pino from 'pino';
import { RateLimitMiddleware } from './core/middleware/rate-limit.middleware';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    LocalConfigModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        redact: ['request.headers.authorization'],
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    RedisModule.forRootAsync({
      useFactory: async (
        localConfigService: LocalConfigService,
      ): Promise<LocalConfigService> => {
        return localConfigService;
      },
      inject: [LocalConfigService],
    }),
    CurrencyModule,
    UserModule,
    ConfigModule,
    RedisModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [RateLimitMiddleware];
    consumer
      .apply(...middlewares)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
