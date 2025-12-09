import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';

import type { MediaItem } from '../models/movie.model';
import type { ErrorInfo } from '../services/error-handler.service';

import { ErrorHandlerService } from '../services/error-handler.service';
import { TmdbApiService } from '../services/tmdb-api.service';
interface SearchState {
  error: ErrorInfo | null;
  isLoading: boolean;
  query: string;
  results: MediaItem[];
}

const initialState: SearchState = {
  error: null,
  isLoading: false,
  query: '',
  results: []
};

export const SearchStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, tmdbApi = inject(TmdbApiService), errorHandler = inject(ErrorHandlerService)) => ({
    /**
     * Limpia los resultados y la consulta de búsqueda
     */
    clearSearch(): void {
      patchState(store, initialState);
    },

    /**
     * Realiza la búsqueda con debounce (300ms)
     * Limita los resultados a 5 elementos
     */
    search: rxMethod<string>(
      pipe(
        tap((query) => {
          patchState(store, { error: null, isLoading: true, query });
        }),
        switchMap((query) => {
          if (!query.trim()) {
            return of({ results: [] });
          }

          return tmdbApi.searchMulti(query).pipe(
            catchError((error: unknown) => {
              const errorInfo = errorHandler.handleHttpError(error);
              errorHandler.logError(errorInfo);
              patchState(store, { error: errorInfo, isLoading: false });
              return of({ results: [] });
            })
          );
        }),
        tap((response) => {
          // Limitar a 5 resultados
          const limitedResults = response.results.slice(0, 5);
          patchState(store, { isLoading: false, results: limitedResults });
        })
      )
    )
  }))
);
