import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<null | Window>('WindowToken');

/**
 * Funcion de factoria para obtener la ventana actual
 * @returns {null | Window} - La ventana actual o null si no se encuentra
 */
export function windowFactory(): null | Window {
  return typeof window !== 'undefined' ? window : null;
}
