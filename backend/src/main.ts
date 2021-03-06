import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());

  app.enableCors({
    origin: [/^(.*)/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Forwarded-for',
  });

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get<string>('AWS_MANGA_ACCESS_KEY_ID'),
    secretAccessKey: configService.get<string>('AWS_MANGA_SECRET_ACCESS_KEY'),
    region: configService.get<string>('AWS_MANGA_REGION'),
  });

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 8080;
  await app.listen(port);
  Logger.log('Listening at http://localhost:' + port + '/');
}
bootstrap();
