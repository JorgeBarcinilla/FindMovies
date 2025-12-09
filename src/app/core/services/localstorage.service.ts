import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

/**
 *
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private _platformId = inject(PLATFORM_ID);

  /**
   * Comprueba si se está ejecutando en el navegador
   * @returns {boolean} - True si se está ejecutando en el navegador, false en caso contrario
   */
  private isBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }

  /**
   * Obtiene un valor de localStorage
   * @param {string} key - Clave del valor a obtener
   * @returns {null | string} - Valor obtenido de localStorage
   */
  get(key: string): null | string {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(key);
  }
  /**
   * Elimina un valor de localStorage
   * @param {string} key - Clave del valor a eliminar
   */
  remove(key: string): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(key);
  }
  /**
   * Guarda un valor en localStorage
   * @param {string} key - Clave del valor a guardar
   * @param {string} value - Valor a guardar en localStorage
   */
  set(key: string, value: string): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(key, value);
  }
}
