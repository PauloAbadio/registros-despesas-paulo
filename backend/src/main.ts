
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initDatabase } from './init-database';
import * as process from 'process';

async function bootstrap() {
  // Initialize database before starting the app
  await initDatabase();
  
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}
bootstrap();
