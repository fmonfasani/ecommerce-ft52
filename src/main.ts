/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerglobal } from './middlewares/loggerglobal';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config({ path: './.development.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerglobal);
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('NestJs API - Ecommerce App FT52')
    .setDescription(
      'Projecto Integrador de la especialidad de Backend con NestJs',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
