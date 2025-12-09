import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, forkJoin, of, pipe, switchMap, tap } from 'rxjs';

import type { MediaItem } from '../models/movie.model';
import type { ErrorInfo } from '../services/error-handler.service';

import { ErrorHandlerService } from '../services/error-handler.service';
import { TmdbApiService } from '../services/tmdb-api.service';

export type TrendingTab = 'movies' | 'series';

interface MoviesState {
  isLoadingMoreMovies: boolean;
  isLoadingMoreRecent: boolean;
  isLoadingMoreSeries: boolean;
  isLoadingRecent: boolean;
  isLoadingTrending: boolean;
  recentError: ErrorInfo | null;
  recentReleases: MediaItem[];
  recentReleasesPage: number;
  trendingError: ErrorInfo | null;
  trendingMovies: MediaItem[];
  trendingMoviesPage: number;
  trendingTabSelected: TrendingTab;
  trendingTvSeries: MediaItem[];
  trendingTvSeriesPage: number;
}

const initialState: MoviesState = {
  isLoadingMoreMovies: false,
  isLoadingMoreRecent: false,
  isLoadingMoreSeries: false,
  isLoadingRecent: false,
  isLoadingTrending: false,
  recentError: null,
  recentReleases: [],
  recentReleasesPage: 1,
  trendingError: null,
  trendingMovies: [],
  trendingMoviesPage: 1,
  trendingTabSelected: 'movies',
  trendingTvSeries: [],
  trendingTvSeriesPage: 1
};

export const MoviesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, tmdbApi = inject(TmdbApiService), errorHandler = inject(ErrorHandlerService)) => ({
    /**
     * Carga más películas en tendencia (paginación)
     */
    loadMoreMovies: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { isLoadingMoreMovies: true });
        }),
        switchMap(() => {
          const nextPage = store.trendingMoviesPage() + 1;
          return tmdbApi.getTrendingMovies(nextPage).pipe(
            catchError(() => {
              patchState(store, { isLoadingMoreMovies: false });
              return of({ results: [] });
            })
          );
        }),
        tap((response) => {
          patchState(store, {
            isLoadingMoreMovies: false,
            trendingMovies: [...store.trendingMovies(), ...response.results],
            trendingMoviesPage: store.trendingMoviesPage() + 1
          });
        })
      )
    ),

    /**
     * Carga más lanzamientos recientes (paginación)
     */
    loadMoreRecent: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { isLoadingMoreRecent: true });
        }),
        switchMap(() => {
          const currentYear = new Date().getFullYear();
          const nextPage = store.recentReleasesPage() + 1;
          return forkJoin({
            movies$: tmdbApi.getMoviesByYear(currentYear, nextPage),
            tvSeries$: tmdbApi.getTvSeriesByYear(currentYear, nextPage)
          }).pipe(
            catchError(() => {
              patchState(store, { isLoadingMoreRecent: false });
              return of({ movies$: { results: [] }, tvSeries$: { results: [] } });
            })
          );
        }),
        tap((response) => {
          const combined = [...response.movies$.results, ...response.tvSeries$.results];
          patchState(store, {
            isLoadingMoreRecent: false,
            recentReleases: [...store.recentReleases(), ...combined],
            recentReleasesPage: store.recentReleasesPage() + 1
          });
        })
      )
    ),

    /**
     * Carga más series de TV en tendencia (paginación)
     */
    loadMoreSeries: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { isLoadingMoreSeries: true });
        }),
        switchMap(() => {
          const nextPage = store.trendingTvSeriesPage() + 1;
          return tmdbApi.getTrendingTvSeries(nextPage).pipe(
            catchError(() => {
              patchState(store, { isLoadingMoreSeries: false });
              return of({ results: [] });
            })
          );
        }),
        tap((response) => {
          patchState(store, {
            isLoadingMoreSeries: false,
            trendingTvSeries: [...store.trendingTvSeries(), ...response.results],
            trendingTvSeriesPage: store.trendingTvSeriesPage() + 1
          });
        })
      )
    ),

    /**
     * Carga lanzamientos recientes (películas y series de TV del año actual)
     */
    loadRecentReleases: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { isLoadingRecent: true, recentError: null });
        }),
        switchMap(() => {
          const currentYear = new Date().getFullYear();
          return forkJoin({
            movies$: tmdbApi.getMoviesByYear(currentYear),
            tvSeries$: tmdbApi.getTvSeriesByYear(currentYear)
          }).pipe(
            catchError((error: unknown) => {
              const errorInfo = errorHandler.handleHttpError(error);
              errorHandler.logError(errorInfo);
              patchState(store, {
                isLoadingRecent: false,
                recentError: errorInfo
              });
              return of({ movies$: { results: [] }, tvSeries$: { results: [] } });
            })
          );
        }),
        tap((response) => {
          // Combinar y mezclar resultados
          const combined = [...response.movies$.results, ...response.tvSeries$.results];
          patchState(store, {
            isLoadingRecent: false,
            recentReleases: combined,
            recentReleasesPage: 1
          });
        })
      )
    ),

    /**
     * Carga películas y series de TV en tendencia (carga inicial)
     */
    loadTrending: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, {
            isLoadingTrending: true,
            trendingError: null
          });
        }),
        switchMap(() =>
          forkJoin({
            movies$: tmdbApi.getTrendingMovies(),
            tvSeries$: tmdbApi.getTrendingTvSeries()
          }).pipe(
            catchError((error: unknown) => {
              const errorInfo = errorHandler.handleHttpError(error);
              errorHandler.logError(errorInfo);
              patchState(store, {
                isLoadingTrending: false,
                trendingError: errorInfo
              });
              return of({ movies$: { results: [] }, tvSeries$: { results: [] } });
            })
          )
        ),
        tap((response) => {
          patchState(store, {
            isLoadingTrending: false,
            trendingMovies: response.movies$.results,
            trendingMoviesPage: 1,
            trendingTvSeries: response.tvSeries$.results,
            trendingTvSeriesPage: 1
          });
        })
      )
    ),

    /**
     * Maneja el cambio de pestaña de tendencias
     * @param {TrendingTab} tab - Valor de la pestaña seleccionada
     */
    onTrendingTabChange(tab: TrendingTab): void {
      patchState(store, { trendingTabSelected: tab });
    },

    /**
     * Actualiza todos los datos
     */
    refreshAll(): void {
      this.loadTrending();
      this.loadRecentReleases();
    }
  })),
  withHooks({
    // eslint-disable-next-line jsdoc/require-jsdoc
    onInit(store): void {
      store.loadTrending();
      store.loadRecentReleases();
    }
  })
);
