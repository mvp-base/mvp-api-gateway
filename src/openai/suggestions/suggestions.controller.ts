import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Body,
  Req,
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
    @Req() req: Request,
  ): Promise<SuggestionsResponseDto> {
    this.logger.info(
      `Incoming request to /suggestions: method=${req.method}, url=${req.url}, headers=${JSON.stringify(req.headers)}, body=${JSON.stringify(body)}`,
    );

    const response = await this.suggestionsService.generateSuggestions(
      body.query,
    );

    this.logger.info(`Outgoing Response: body=${JSON.stringify(response)}`);

    return response;
  }
}
