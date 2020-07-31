import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create<NestApplication>(
    AppModule,
    {
      cors: true,
    },
  );

  app.setGlobalPrefix('v1')

  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  const swaggerDocumentOption = new DocumentBuilder()
    .setTitle('Chat server')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addOAuth2()
    .build();
  const documentSwagger = SwaggerModule.createDocument(
    app,
    swaggerDocumentOption,
  );
  SwaggerModule.setup('v1/docs', app, documentSwagger);

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
