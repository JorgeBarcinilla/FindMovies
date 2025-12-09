import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 *
 */
@Directive({
  selector: 'img[appImageFallback]',
  standalone: true
})
/**
 * Directiva para manejar errores de carga de imágenes
 * Reemplaza la imagen fallida con un fallback
 */
export class ImageFallbackDirective {
  private _elementRef = inject<ElementRef<HTMLImageElement>>(ElementRef);

  /**
   * Maneja el evento de error de la imagen
   */
  @HostListener('error')
  onError(): void {
    const fallback = '/images/no_image.svg';
    if (this._elementRef.nativeElement.src !== fallback) {
      this._elementRef.nativeElement.src = fallback;
    }
  }
}
