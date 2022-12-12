import { Logger } from 'nestjs-pino';
import { TransformInterceptor } from './transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService as LocalConfigServer } from './config/config.service';

export default async function bootstrap(app, listening: boolean = true) {
  const localConfigServer: LocalConfigServer = app.get(LocalConfigServer);
  app.useLogger(app.get(Logger));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const options = {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: 'thisIsASampleBearerAuthToken123',
        },
      },
    },
  };

  const config = new DocumentBuilder()
    .setTitle('Currency Conversion service')
    .setDescription(
      'A secure API service to convert currency from one currency code to another',
    )
    .setVersion('1.0')
    .addTag('auth')
    .addTag('currency')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);

  if (listening) {
    await app.listen(localConfigServer.server.port || 3000);
  }
}
