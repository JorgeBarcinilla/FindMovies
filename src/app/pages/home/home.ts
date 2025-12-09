import { Component, inject } from '@angular/core';

import { MoviesStore } from '../../core/store/movies.store';
import { SignalPipe } from '../../pipes/signal.pipe';
import { HorizontalScrollComponent } from '../../shared/components/horizontal-scroll/horizontal-scroll';
import { MediaCardComponent } from '../../shared/components/media-card/media-card';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader';
import { type TabOption, TabSwitcherComponent } from '../../shared/components/tab-switcher/tab-switcher';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle';

/**
 * Componente de la página de inicio
 * Muestra películas en tendencia, series de TV y lanzamientos recientes con pestañas y desplazamiento horizontal
 */
@Component({
  imports: [
    MediaCardComponent,
    SearchBarComponent,
    SkeletonLoaderComponent,
    ThemeToggleComponent,
    TabSwitcherComponent,
    HorizontalScrollComponent,
    SignalPipe
  ],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html'
})
export class HomeComponent {
  protected readonly _moviesStore = inject(MoviesStore);

  /**
   * Opciones de pestaña para la sección de tendencias
   */
  protected readonly trendingTabs: TabOption[] = [
    { label: 'Películas', value: 'movies' },
    { label: 'Series', value: 'series' }
  ];

  /**
   * Maneja cargar más para películas en tendencia
   */
  protected onLoadMoreMovies(): void {
    if (!this._moviesStore.isLoadingMoreMovies()) {
      this._moviesStore.loadMoreMovies();
    }
  }
  /**
   * Maneja cargar más para lanzamientos recientes
   */
  protected onLoadMoreRecent(): void {
    if (!this._moviesStore.isLoadingMoreRecent()) {
      this._moviesStore.loadMoreRecent();
    }
  }
  /**
   * Maneja cargar más para series de TV en tendencia
   */
  protected onLoadMoreSeries(): void {
    if (!this._moviesStore.isLoadingMoreSeries()) {
      this._moviesStore.loadMoreSeries();
    }
  }
}
