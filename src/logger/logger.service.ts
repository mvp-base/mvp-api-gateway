import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { TransformableInfo } from 'logform';

export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    const logFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(
        (info: TransformableInfo) =>
          `${info.timestamp as string} ${info.level}: ${info.message as string}`,
      ),
    );

    this.logger = winston.createLogger({
      level: 'debug',
      format: logFormat,
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/application/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '7d',
        }),
        new winston.transports.Console({}),
      ],
    });
  }

  info(message: string) {
    this.logger.log('info', message);
  }

  error(message: string) {
    this.logger.log('error', message);
  }

  warn(message: string) {
    this.logger.log('warn', message);
  }

  debug(message: string) {
    this.logger.log('debug', message);
  }
}
