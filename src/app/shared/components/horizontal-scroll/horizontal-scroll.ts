import { Component, computed, effect, ElementRef, input, output, viewChild } from '@angular/core';

import { SignalPipe } from '../../../pipes/signal.pipe';

/**
 * Componente contenedor de desplazamiento horizontal con navegación por flechas y desplazamiento infinito
 * Proporciona desplazamiento horizontal infinito con animaciones suaves y paginación
 */
@Component({
  imports: [SignalPipe],
  selector: 'app-horizontal-scroll',
  styleUrl: './horizontal-scroll.css',
  templateUrl: './horizontal-scroll.html'
})
export class HorizontalScrollComponent {
  /**
   * Referencia al contenedor de desplazamiento
   */
  protected readonly scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  /**
   * Espacio entre elementos en píxeles
   */
  gap = input<number>(24);
  /**
   * Si se está cargando más contenido
   */
  isLoading = input<boolean>(false);
  /**
   * Evento emitido cuando el usuario se desplaza cerca del final (para desplazamiento infinito)
   */
  loadMore = output<void>();

  /**
   * Cantidad de desplazamiento (ancho de una tarjeta + espacio)
   */
  protected readonly scrollAmount = computed(() => 320 + this.gap());

  constructor() {
    // Set up scroll listener when container is available
    effect(() => {
      const container = this.scrollContainer()?.nativeElement;
      if (container) {
        container.addEventListener('scroll', this.onScroll.bind(this));
      }
    });
  }

  /**
   * Desplaza a la izquierda
   */
  protected scrollLeft(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (container) {
      container.scrollBy({
        behavior: 'smooth',
        left: -this.scrollAmount()
      });
    }
  }
  /**
   * Desplaza a la derecha
   */
  protected scrollRight(): void {
    const container = this.scrollContainer()?.nativeElement;
    if (container) {
      container.scrollBy({
        behavior: 'smooth',
        left: this.scrollAmount()
      });
    }
  }

  /**
   * Maneja el evento de desplazamiento para detectar cuándo está cerca del final
   * @param {Event} event - Evento de desplazamiento
   */
  private onScroll(event: Event): void {
    const container = event.target as HTMLDivElement;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    // Activar carga más cuando se desplaza el 80%
    const scrollPercentage = (scrollLeft + clientWidth) / scrollWidth;
    if (scrollPercentage > 0.8 && !this.isLoading()) {
      this.loadMore.emit();
    }
  }
}
