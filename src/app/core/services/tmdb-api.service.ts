import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import type { PaginatedResponse } from '../models/api-response.model';
import type { Credits, MediaItem, MovieDetails, TvSeriesDetails } from '../models/movie.model';

import { environment } from '../../../environments/environment';

/**
 * Servicio para interactuar con la API de TMDB
 * Proporciona métodos para buscar películas, series de TV y funzionalità de búsqueda
 */
@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  private readonly _http = inject(HttpClient);

  private readonly _apiBaseUrl = environment.apiBaseUrl;
  private readonly _apiKey = environment.apiKey;

  /**
   * Obtiene créditos de la película (elenco y equipo)
   * @param {number} id - ID de la película
   * @returns {Observable<Credits>} Observable de créditos
   */
  getMovieCredits(id: number) {
    const params = new HttpParams().set('api_key', this._apiKey);
    return this._http.get<Credits>(`${this._apiBaseUrl}/movie/${id}/credits`, { params });
  }
  /**
   * Obtiene información detallada para una película específica
   * @param {number} id - ID de la película
   * @returns {Observable<MovieDetails>} Observable de detalles de la película
   */
  getMovieDetails(id: number) {
    const params = new HttpParams().set('api_key', this._apiKey).set('append_to_response', 'credits');
    return this._http.get<MovieDetails>(`${this._apiBaseUrl}/movie/${id}`, { params });
  }
  /**
   * Obtiene películas filtradas por año
   * @param {number} year - Año de lanzamiento
   * @param {number} page - Número de página (por defecto 1)
   * @returns {Observable<PaginatedResponse<MediaItem>>} Observable de resultados de películas paginados
   */
  getMoviesByYear(year: number, page = 1) {
    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('primary_release_year', year.toString())
      .set('sort_by', 'popularity.desc')
      .set('page', page.toString());
    return this._http.get<PaginatedResponse<MediaItem>>(`${this._apiBaseUrl}/discover/movie`, { params });
  }
  /**
   * Obtiene películas en tendencia para el día de hoy
   * @param {number} page - Número de página (por defecto 1)
   * @returns {Observable<PaginatedResponse<MediaItem>>} Observable de resultados de películas paginados
   */
  getTrendingMovies(page = 1) {
    const params = new HttpParams().set('api_key', this._apiKey).set('page', page.toString());
    return this._http.get<PaginatedResponse<MediaItem>>(`${this._apiBaseUrl}/trending/movie/day`, { params });
  }
  /**
   * Obtiene series de TV en tendencia para el día de hoy
   * @param {number} page - Número de página (por defecto 1)
   * @returns {Observable<PaginatedResponse<MediaItem>>} Observable de resultados de series de TV paginados
   */
  getTrendingTvSeries(page = 1) {
    const params = new HttpParams().set('api_key', this._apiKey).set('page', page.toString());
    return this._http.get<PaginatedResponse<MediaItem>>(`${this._apiBaseUrl}/trending/tv/day`, { params });
  }
  /**
   * Obtiene series de TV filtradas por año
   * @param {number} year - Año de primera emisión
   * @param {number} page - Número de página (por defecto 1)
   * @returns {Observable<PaginatedResponse<MediaItem>>} Observable de resultados de series de TV paginados
   */
  getTvSeriesByYear(year: number, page = 1) {
    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('first_air_date_year', year.toString())
      .set('sort_by', 'popularity.desc')
      .set('page', page.toString());
    return this._http.get<PaginatedResponse<MediaItem>>(`${this._apiBaseUrl}/discover/tv`, { params });
  }
  /**
   * Obtiene créditos de la serie de TV (elenco y equipo)
   * @param {number} id - ID de la serie de TV
   * @returns {Observable<Credits>} Observable de créditos
   */
  getTvSeriesCredits(id: number) {
    const params = new HttpParams().set('api_key', this._apiKey);
    return this._http.get<Credits>(`${this._apiBaseUrl}/tv/${id}/credits`, { params });
  }
  /**
   * Obtiene información detallada para una serie de TV específica
   * @param {number} id - ID de la serie de TV
   * @returns {Observable<TvSeriesDetails>} Observable de detalles de la serie de TV
   */
  getTvSeriesDetails(id: number) {
    const params = new HttpParams().set('api_key', this._apiKey).set('append_to_response', 'credits');
    return this._http.get<TvSeriesDetails>(`${this._apiBaseUrl}/tv/${id}`, { params });
  }
  /**
   * Busca películas y series de TV
   * @param {string} query - Cadena de búsqueda
   * @returns {Observable<PaginatedResponse<MediaItem>>} Observable de resultados de búsqueda paginados
   */
  searchMulti(query: string) {
    const params = new HttpParams().set('api_key', this._apiKey).set('query', query).set('include_adult', 'false');
    return this._http.get<PaginatedResponse<MediaItem>>(`${this._apiBaseUrl}/search/multi`, { params }).pipe(
      map((response) => {
        response.results = response.results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv');
        return response;
      })
    );
  }
}
