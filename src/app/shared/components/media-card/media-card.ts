import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import type { MediaItem } from '../../../core/models/movie.model';

import { environment } from '../../../../environments/environment';
import { SignalPipe } from '../../../pipes/signal.pipe';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';

/**
 * Componente de tarjeta multimedia para mostrar información de películas/series de TV
 * Muestra póster, título, calificación y año con efectos hover glassmorphic
 */
@Component({
  imports: [NgOptimizedImage, SignalPipe, ImageFallbackDirective],
  selector: 'app-media-card',
  styleUrl: './media-card.css',
  templateUrl: './media-card.html'
})
export class MediaCardComponent {
  private readonly _router = inject(Router);

  /**
   * Elemento multimedia (película o serie de TV) para mostrar
   */
  media = input.required<MediaItem>();
  priority = input.required<boolean>();

  /**
   * Tipo de medio calculado
   */
  protected readonly mediaType = computed(() => {
    const media = this.media();
    return 'title' in media ? 'movie' : 'tv';
  });
  /**
   * URL del póster calculada
   */
  protected readonly posterUrl = computed(() => {
    const posterPath = this.media().poster_path;
    return posterPath ? `${environment.imageBaseUrl.poster}${posterPath}` : '/assets/no-poster.png';
  });
  /**
   * Calificación calculada (redondeada a 1 decimal)
   */
  protected readonly rating = computed(() => {
    return this.media().vote_average.toFixed(1);
  });
  /**
   * Título calculado (maneja tanto Película como Serie de TV)
   */
  protected readonly title = computed(() => {
    const media = this.media();
    return 'title' in media ? media.title : media.name;
  });
  /**
   * Año calculado a partir de la fecha de lanzamiento
   */
  protected readonly year = computed(() => {
    const media = this.media();
    const date = 'release_date' in media ? media.release_date : media.first_air_date;
    return date ? new Date(date).getFullYear() : 'N/A';
  });

  /**
   * Maneja el clic en la tarjeta - navega a la página de detalles
   */
  protected onClick(): void {
    const type = this.mediaType();
    const id = this.media().id;
    this._router.navigate(['/details', type, id]).catch((error) => {
      console.error('Error al navegar a la página de detalles:', error);
    });
  }
}
