export interface CastMember {
  character: string;
  id: number;
  name: string;
  profile_path: null | string;
}

export interface Creator {
  id: number;
  name: string;
  profile_path: null | string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CrewMember {
  department: string;
  id: number;
  job: string;
  name: string;
  profile_path: null | string;
}

export interface Genre {
  id: number;
  name: string;
}

export type MediaItem = Movie | TvSeries;

export interface Movie {
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  media_type?: 'movie';
  overview: string;
  poster_path: null | string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface MovieDetails extends Movie {
  budget: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface SearchResult {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
}

export interface TvSeries {
  backdrop_path: null | string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type?: 'tv';
  name: string;
  overview: string;
  poster_path: null | string;
  vote_average: number;
}

export interface TvSeriesDetails extends TvSeries {
  created_by: Creator[];
  episode_run_time: number[];
  genres: Genre[];
  last_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  status: string;
  tagline: string;
}
