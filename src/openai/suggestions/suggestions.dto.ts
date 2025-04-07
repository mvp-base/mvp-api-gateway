import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

class BookDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  shortDesc: string;

  @IsString()
  @IsNotEmpty()
  plot: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  rating: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  ISBN: string;

  @IsString()
  @IsNotEmpty()
  pageCount: string;
}

class MovieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  shortDesc: string;

  @IsString()
  @IsNotEmpty()
  plot: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  rating: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  boxOffice: string;

  @IsString()
  @IsNotEmpty()
  runtime: string;
}

class SuggestionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookDto)
  books: BookDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MovieDto)
  movies: MovieDto[];
}

export class SuggestionsResponseDto {
  @ValidateNested()
  @Type(() => SuggestionsDto)
  suggestions: SuggestionsDto;
}

export class SuggestionsRequestDto {
  @IsIn(['REQUEST_GENERATE_SUGGESTION'])
  type: 'REQUEST_GENERATE_SUGGESTION';

  @IsNotEmpty()
  @IsString()
  query: string;
}
