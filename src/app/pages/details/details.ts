import { DatePipe, Location, NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DetailsStore } from '../../core/store/details.store';
import { SignalPipe } from '../../pipes/signal.pipe';
import { ToFixedPipe } from '../../pipes/string.pipe';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle';
import { ImageFallbackDirective } from '../../shared/directives/image-fallback.directive';

/**
 * Componente de la página de detalles
 * Muestra información completa sobre una película o serie de TV
 */
@Component({
  imports: [
    NgTemplateOutlet,
    SkeletonLoaderComponent,
    SignalPipe,
    ThemeToggleComponent,
    DatePipe,
    ImageFallbackDirective,
    ToFixedPipe
  ],
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html'
})
export class DetailsComponent {
  private readonly _location = inject(Location);
  private readonly _route = inject(ActivatedRoute);
  protected readonly detailsStore = inject(DetailsStore);

  /**
   * Tipo de medio desde la ruta (película o TV)
   */
  protected readonly mediaType = computed(() => this._route.snapshot.paramMap.get('type') as 'movie' | 'tv');
  /**
   * Detalles actuales (película o TV)
   */
  protected readonly details = computed(() => {
    return this.mediaType() === 'movie' ? this.detailsStore.movieDetails() : this.detailsStore.tvDetails();
  });
  /**
   * URL de la imagen de fondo
   */
  protected readonly backdropUrl = computed(() => {
    const details = this.details();
    return details?.backdrop_path ? `https://image.tmdb.org/t/p/original${details.backdrop_path}` : '';
  });
  /**
   * Nombres del director o creador
   */
  protected readonly creators = computed(() => {
    const details = this.details();
    if (!details) return '';
    if ('created_by' in details && details.created_by?.length > 0) {
      return details.created_by.map((c) => c.name).join(', ');
    }
    return '';
  });
  /**
   * ID del medio desde la ruta
   */
  protected readonly mediaId = computed(() => Number(this._route.snapshot.paramMap.get('id')));
  /**
   * URL de la imagen del póster
   */
  protected readonly posterUrl = computed(() => {
    const details = this.details();
    return details?.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : '';
  });
  /**
   * Array de estrellas de calificación (0-5 estrellas)
   */
  protected readonly ratingStars = computed(() => {
    const details = this.details();
    if (!details) return [];
    const rating = Math.round((details.vote_average / 10) * 5);
    return Array(5)
      .fill(0)
      .map((_, i) => i < rating);
  });
  /**
   * Información de duración o temporadas formateada
   */
  protected readonly runtimeInfo = computed(() => {
    const details = this.details();
    if (!details) return '';

    if ('runtime' in details) {
      const hours = Math.floor(details.runtime / 60);
      const minutes = details.runtime % 60;
      return `${hours}h ${minutes}m`;
    }

    if ('number_of_seasons' in details) {
      const seasons = details.number_of_seasons;
      return `${seasons} ${seasons === 1 ? 'Temporada' : 'Temporadas'}`;
    }

    return '';
  });
  /**
   * Título (título de la película o nombre de la serie de TV)
   */
  protected readonly title = computed(() => {
    const details = this.details();
    if (!details) return '';
    return 'title' in details ? details.title : details.name;
  });
  /**
   * Año formateado
   */
  protected readonly year = computed(() => {
    const details = this.details();
    if (!details) return '';

    if ('release_date' in details) {
      return details.release_date?.split('-')[0] || '';
    }
    return details.first_air_date?.split('-')[0] || '';
  });

  constructor() {
    effect(() => {
      const type = this.mediaType();
      const id = this.mediaId();

      if (type === 'movie') {
        this.detailsStore.loadMovieDetails(id);
      } else if (type === 'tv') {
        this.detailsStore.loadTvDetails(id);
      }
    });
  }

  /**
   * Navega a la página anterior
   */
  protected goBack(): void {
    this._location.back();
  }
}
