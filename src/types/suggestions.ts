export interface IBook {
  name: string;
  coverImage: string;
  link: string;
  shortDesc: string;
  plot: string;
  genre: string;
  rating: string;
  author: string;
  ISBN: string;
  pageCount: string;
}

export interface IMovie {
  name: string;
  coverImage: string;
  link: string;
  shortDesc: string;
  plot: string;
  genre: string;
  rating: string;
  director: string;
  boxOffice: string;
  runtime: string;
}

export interface ISuggestions {
  books: IBook[];
  movies: IMovie[];
}
