import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { TransformInterceptor } from './transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import bootstrap from './bootstrap';

async function main() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  await bootstrap(app);
}
main();
