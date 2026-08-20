import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Dynamic CORS: allow localhost + any *.vercel.app deployment
  app.enableCors({
    origin: (origin, callback) => {
      const allowedPatterns = [
        /^http:\/\/localhost(:\d+)?$/,          // localhost any port
        /^https:\/\/.*\.vercel\.app$/,          // any *.vercel.app
        /^https:\/\/shoesecommerce.*\.vercel\.app$/, // project-specific
      ];

      // Allow requests with no origin (mobile apps, Postman, server-to-server)
      if (!origin) return callback(null, true);

      const isAllowed = allowedPatterns.some((pattern) => pattern.test(origin));
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: false, // JWT in Authorization header, not cookies — no need for credentials
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

