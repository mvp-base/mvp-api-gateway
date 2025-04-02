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

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 9000, '0.0.0.0');
  logger.info(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
