import { Module } from '@nestjs/common';
import { SuggestionsController } from './suggestions/suggestions.controller';
import { SuggestionsService } from './suggestions/suggestions.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
})
export class OpenaiModule {}
