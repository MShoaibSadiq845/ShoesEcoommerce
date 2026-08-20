import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Clean and foolproof CORS configuration
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, or server-to-server curl)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://shoesecommerce-rho.vercel.app',
      ];

      const isVercelDomain = /\.vercel\.app$/.test(origin);
      const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin);

      if (allowedOrigins.includes(origin) || isVercelDomain || isLocalhost) {
        callback(null, true);
      } else {
        // Fallback: allow all origins to prevent unexpected CORS blocks in production
        callback(null, true);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,Accept',
    credentials: true,
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