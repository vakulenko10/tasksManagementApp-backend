import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ensureDatabaseExists } from './pre-bootstrap';

async function bootstrap() {
  await ensureDatabaseExists(); 
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173', // set production origin via env
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
