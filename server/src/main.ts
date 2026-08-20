import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Clean and foolproof CORS configuration
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://shoesecommerce-rho.vercel.app',
      /\.vercel\.app$/, // Allows any Vercel preview/production deployment automatically
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 NestJS Backend running on port ${port}`);
}

bootstrap();