import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const logger = new LoggerService();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const allowedOrigins = [/\.matejv\.com$/, 'https://matejv.com']; // Allow matejv.com & all subdomains

  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.some((allowed) =>
          allowed instanceof RegExp ? allowed.test(origin) : allowed === origin,
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 9000, '0.0.0.0');
  logger.info(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
