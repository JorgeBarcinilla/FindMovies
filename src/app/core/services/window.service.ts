import { inject, Injectable } from '@angular/core';

import { WINDOW } from '../tokens/window.token';

/**
 *
 */
@Injectable({ providedIn: 'root' })
export class WindowService {
  private readonly _windowRef = inject(WINDOW);

  /**
   * Obtiene la referencia nativa de window
   * @returns {null | Window} Referencia nativa de window
   */
  get nativeWindow(): null | Window {
    return this._windowRef;
  }

  /**
   * Añade un listener de eventos a la ventana
   * @param {K} type - Tipo de evento
   * @param {EventListenerOrEventListenerObject} listener - Listener de eventos
   * @param {AddEventListenerOptions | boolean} options - Opciones de listener
   */
  addEventListener<K extends keyof WindowEventMap>(
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => unknown,
    options?: AddEventListenerOptions | boolean
  ) {
    if (!this._windowRef) return;
    this._windowRef.addEventListener(type, listener as EventListenerOrEventListenerObject, options);
  }
  /**
   * Obtiene el ancho interno de la ventana
   * @returns {null | number} Ancho interno de la ventana
   */
  getInnerWidth(): null | number {
    return this._windowRef?.innerWidth ?? null;
  }
  /**
   * Elimina un listener de eventos de la ventana
   * @param {K} type - Tipo de evento
   * @param {EventListenerOrEventListenerObject} listener - Listener de eventos
   * @param {boolean | EventListenerOptions} options - Opciones de listener
   */
  removeEventListener<K extends keyof WindowEventMap>(
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => unknown,
    options?: boolean | EventListenerOptions
  ) {
    if (!this._windowRef) return;
    this._windowRef.removeEventListener(type, listener as EventListenerOrEventListenerObject, options);
  }
  /**
   * Desplaza la ventana hacia arriba
   */
  scrollToTop(): void {
    if (!this._windowRef) return;
    this._windowRef.scrollTo({ behavior: 'smooth', top: 0 });
  }
}
