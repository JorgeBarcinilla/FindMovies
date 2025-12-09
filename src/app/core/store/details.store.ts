import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';

import type { MovieDetails, TvSeriesDetails } from '../models/movie.model';
import type { ErrorInfo } from '../services/error-handler.service';

import { ErrorHandlerService } from '../services/error-handler.service';
import { TmdbApiService } from '../services/tmdb-api.service';

interface DetailsState {
  error: ErrorInfo | null;
  isLoading: boolean;
  movieDetails: MovieDetails | null;
  tvDetails: null | TvSeriesDetails;
}

const initialState: DetailsState = {
  error: null,
  isLoading: false,
  movieDetails: null,
  tvDetails: null
};

export const DetailsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, tmdbApi = inject(TmdbApiService), errorHandler = inject(ErrorHandlerService)) => ({
    loadMovieDetails: rxMethod<number>(
      pipe(
        tap(() => {
          patchState(store, {
            error: null,
            isLoading: true,
            movieDetails: null,
            tvDetails: null
          });
        }),
        switchMap((id) =>
          tmdbApi.getMovieDetails(id).pipe(
            catchError((error: unknown) => {
              const errorInfo = errorHandler.handleHttpError(error);
              errorHandler.logError(errorInfo);
              patchState(store, {
                error: errorInfo,
                isLoading: false
              });
              return of(null);
            })
          )
        ),
        tap((details) => {
          if (details) {
            patchState(store, {
              isLoading: false,
              movieDetails: details
            });
          }
        })
      )
    ),

    loadTvDetails: rxMethod<number>(
      pipe(
        tap(() => {
          patchState(store, {
            error: null,
            isLoading: true,
            movieDetails: null,
            tvDetails: null
          });
        }),
        switchMap((id) =>
          tmdbApi.getTvSeriesDetails(id).pipe(
            catchError((error: unknown) => {
              const errorInfo = errorHandler.handleHttpError(error);
              errorHandler.logError(errorInfo);
              patchState(store, {
                error: errorInfo,
                isLoading: false
              });
              return of(null);
            })
          )
        ),
        tap((details) => {
          if (details) {
            patchState(store, {
              isLoading: false,
              tvDetails: details
            });
          }
        })
      )
    ),
    reset: () => patchState(store, initialState)
  }))
);
