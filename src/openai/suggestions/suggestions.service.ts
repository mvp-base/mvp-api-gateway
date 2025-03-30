import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { getSchema } from 'src/utils/getSchemas';
import { ISchema } from 'src/types/schemas';
import { ConfigService } from '@nestjs/config';
import { SuggestionsResponseDto } from './suggestions.dto';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SuggestionsService {
  private openai: OpenAI;
  private suggestionsSchema: ISchema;

  constructor(
    private ConfigService: ConfigService,
    private logger: LoggerService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.ConfigService.get<string>('OPENAI_API_KEY'),
    });
    this.suggestionsSchema = getSchema('suggestions');
  }

  async generateSuggestions(query: string): Promise<SuggestionsResponseDto> {
    this.logger.info('Getting Suggestions from OpenAI');
    try {
      const response = await this.openai.responses.create({
        model: 'gpt-4o',
        input: [
          {
            role: 'system',
            content:
              'Your job is to generate movies or books suggestions based on users explanation or feelings.',
          },
          {
            role: 'system',
            content:
              'In your structured response, you shall include a link to an image of given book or movie. For movie use TMDb API and for books use Google Books API.',
          },
          { role: 'user', content: query },
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'suggestions',
            schema: this.suggestionsSchema,
            strict: false,
          },
        },
      });

      if (!response || !response.output_text) {
        throw new Error('Failed to generate suggestions');
      }

      this.logger.info(`Response from OpenAI: ${response.output_text}`);

      const suggestionsResponse = JSON.parse(
        response.output_text,
      ) as SuggestionsResponseDto;
      const dtoInstance = plainToInstance(
        SuggestionsResponseDto,
        suggestionsResponse.suggestions,
      );
      const validationErrors = await validate(dtoInstance);

      if (validationErrors.length > 0) {
        throw new Error('Failed to validate response');
      }

      return suggestionsResponse;
    } catch (error: any) {
      if (error instanceof Error) {
        console.error('Error generating suggestions:', error.message);
        throw new Error('Failed to generate suggestions: ' + error.message);
      } else {
        console.error('Error generating suggestions:', error);
        throw new Error('Failed to generate suggestions');
      }
    }
  }
}
