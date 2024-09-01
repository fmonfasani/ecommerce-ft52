/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerglobal } from './middlewares/loggerglobal';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config({ path: './.development.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerglobal);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
