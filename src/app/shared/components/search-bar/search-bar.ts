import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

import { SearchStore } from '../../../core/store/search.store';
import { MoviePipe } from '../../../pipes/movie.pipe';
import { SignalPipe } from '../../../pipes/signal.pipe';
import { ToFixedPipe } from '../../../pipes/string.pipe';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader';

/**
 * Componente de barra de búsqueda con búsqueda debounce y resultados desplegables
 * Muestra estados de carga, estados vacíos y hasta 5 resultados de búsqueda
 */
@Component({
  imports: [ReactiveFormsModule, SkeletonLoaderComponent, ImageFallbackDirective, SignalPipe, ToFixedPipe, MoviePipe],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html'
})
export class SearchBarComponent implements OnInit {
  private readonly _router = inject(Router);
  protected readonly searchStore = inject(SearchStore);

  /**
   * Si el menú desplegable está abierto
   */
  protected readonly isDropdownOpen = signal(false);
  /**
   * Control de formulario de entrada de búsqueda
   */
  protected readonly searchControl = new FormControl('');
  /**
   * Elementos de carga skeleton para el estado de carga
   */
  protected readonly skeletonItems = Array(5).fill(0);

  /**
   * Si se debe mostrar el estado vacío
   */
  protected readonly hasEmptyResults = computed(() => {
    return (
      !this.searchStore.isLoading() && this.searchStore.query().trim() !== '' && this.searchStore.results().length === 0
    );
  });
  /**
   * Si se debe mostrar el menú desplegable
   */
  protected readonly showDropdown = computed(() => {
    return (
      this.isDropdownOpen() &&
      (this.searchStore.isLoading() || this.searchStore.results().length > 0 || this.hasEmptyResults())
    );
  });

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (value !== null) {
        this.searchStore.search(value);
        this.isDropdownOpen.set(value.trim().length > 0);
      }
    });
  }

  /**
   * Limpia la búsqueda
   */
  protected clearSearch(): void {
    this.searchControl.setValue('');
    this.searchStore.clearSearch();
    this.isDropdownOpen.set(false);
  }
  /**
   * Maneja el clic en el resultado y navega a la página de detalles
   * @param {string} mediaType - Tipo de medio ('movie' | 'tv')
   * @param {number} id - ID del medio
   */
  protected onResultClick(mediaType: 'movie' | 'tv', id: number): void {
    this._router.navigate(['/details', mediaType, id]).catch((error) => {
      console.error('Error al navegar a la página de detalles:', error);
    });
    this.clearSearch();
  }
}
