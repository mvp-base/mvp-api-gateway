import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { getSchema } from 'src/utils/getSchemas';
import { ISchema } from 'src/types/schemas';
import { SuggestionsResponseDto } from './suggestions.dto';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SuggestionsService {
  private readonly logger: LoggerService;
  private readonly openai: OpenAI;
  private suggestionsSchema: ISchema;

  constructor() {
    this.logger = new LoggerService();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
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
            strict: true,
          },
        },
      });

      if (!response?.output_text) {
        this.logger.error('Response from OpenAI is empty');
        throw new Error('Response from OpenAI is empty');
      }

      const parsed = JSON.parse(response.output_text) as SuggestionsResponseDto;

      const dtoInstance = plainToInstance(SuggestionsResponseDto, parsed);
      const validationErrors = await validate(dtoInstance);

      if (validationErrors.length > 0) {
        this.logger.error(
          `Validation errors: ${JSON.stringify(validationErrors)}`,
        );
        throw new Error('Failed to validate response');
      }

      return dtoInstance;
    } catch (error: any) {
      if (error instanceof Error) {
        this.logger.error(`Error generating suggestions: ${error.message}`);
        throw new Error('Failed to generate suggestions: ' + error.message);
      } else {
        this.logger.error(`Unknown error: ${JSON.stringify(error)}`);
        throw new Error('Failed to generate suggestions');
      }
    }
  }
}
