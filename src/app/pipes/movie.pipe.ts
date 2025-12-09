import { Pipe, PipeTransform } from '@angular/core';

import { MediaItem } from '../core/models/movie.model';

interface MovieInfo {
  posterUrl: string;
  title: string;
  type: 'movie' | 'tv';
  year: string;
}

/**
 * Pipe para obtener datos de un elemento multimedia
 */
@Pipe({
  name: 'getMovieInfo'
})
export class MoviePipe implements PipeTransform {
  /**
   * Obtiene el tipo de medio para la navegación
   * @param {MediaItem} media - Elemento multimedia
   * @returns {'movie' | 'tv'} - Tipo de medio
   */
  private getMediaType(media: MediaItem): 'movie' | 'tv' {
    return 'title' in media ? 'movie' : 'tv';
  }
  /**
   * Obtiene la URL del póster para un elemento multimedia
   * @param {MediaItem} media - Elemento multimedia
   * @returns {string} - URL del póster del elemento multimedia
   */
  private getPosterUrl(media: MediaItem): string {
    return media.poster_path ? `https://image.tmdb.org/t/p/w200${media.poster_path}` : '';
  }
  /**
   * Obtiene el título para un elemento multimedia
   * @param {MediaItem} media - Elemento multimedia
   * @returns {string} - Título del elemento multimedia
   */
  private getTitle(media: MediaItem): string {
    return 'title' in media ? media.title : media.name;
  }
  /**
   * Obtiene el año para un elemento multimedia
   * @param {MediaItem} media - Elemento multimedia
   * @returns {string} - Año del elemento multimedia
   */
  private getYear(media: MediaItem): string {
    if ('release_date' in media) {
      return media.release_date?.split('-')[0] || '';
    }
    return media.first_air_date?.split('-')[0] || '';
  }

  /**
   * Obtiene la información de un elemento multimedia
   * @param {MediaItem} media - Elemento multimedia
   * @returns {MovieInfo} - Información del elemento multimedia
   */
  transform(media: MediaItem): MovieInfo {
    return {
      posterUrl: this.getPosterUrl(media),
      title: this.getTitle(media),
      type: this.getMediaType(media),
      year: this.getYear(media)
    };
  }
}
