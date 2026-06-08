import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 IMPORTANTE PARA UPLOADS
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://connectbuy-frontend.vercel.app'
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();