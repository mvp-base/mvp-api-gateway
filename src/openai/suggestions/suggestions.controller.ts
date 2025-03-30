import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Body,
} from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import {
  SuggestionsRequestDto,
  SuggestionsResponseDto,
} from './suggestions.dto';
import { LoggerService } from 'src/logger/logger.service';

@Controller('suggestions')
export class SuggestionsController {
  constructor(
    private readonly suggestionsService: SuggestionsService,
    private readonly logger: LoggerService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getSuggestions(
    @Body() body: SuggestionsRequestDto,
  ): Promise<SuggestionsResponseDto> {
    this.logger.info('New POST request to /suggestions');
    this.logger.info(`Request body: ${JSON.stringify(body)}`);

    const response = await this.suggestionsService.generateSuggestions(
      body.query,
    );

    this.logger.info(`Response: ${JSON.stringify(response)}`);

    return response;
  }
}
