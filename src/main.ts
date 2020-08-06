import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create<NestApplication>(
    AppModule,
  );

  app.use(cookieParser());

  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  const swaggerDocumentOption = new DocumentBuilder()
    .setTitle('Chat RESTful API documentation')
    .setVersion('1.0.0')
    .addCookieAuth('accessToken')
    .addOAuth2()
    .build();
  const documentSwagger = SwaggerModule.createDocument(
    app,
    swaggerDocumentOption,
  );
  SwaggerModule.setup('docs', app, documentSwagger);

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
