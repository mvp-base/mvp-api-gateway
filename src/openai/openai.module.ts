import { Module } from '@nestjs/common';
import { SuggestionsController } from './suggestions/suggestions.controller';
import { SuggestionsService } from './suggestions/suggestions.service';

@Module({
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
})
export class OpenaiModule {}
