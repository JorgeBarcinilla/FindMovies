import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

import { LocalStorageService } from './localstorage.service';
import { WindowService } from './window.service';

/**
 * Servicio para gestionar el tema de la aplicación (modo claro/oscuro)
 * Persiste la preferencia de tema en localStorage y aplica la clase de tema al documento
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly _document = inject(DOCUMENT);
  private readonly _localStorageService = inject(LocalStorageService);
  private readonly _windowService = inject(WindowService);

  private readonly _localStorageKey = 'theme-preference';

  /**
   * Señal para el estado del modo oscuro
   */
  readonly isDarkMode = signal<boolean>(this._getInitialTheme());

  constructor() {
    // Aplicar tema en inicialización y cuando cambie
    effect(() => {
      this._applyTheme(this.isDarkMode());
    });
  }

  /**
   * Aplica el tema añadiendo/eliminando la clase dark en el elemento document
   * @param {boolean} isDark - Verdadero para modo oscuro, falso para modo claro
   */
  private _applyTheme(isDark: boolean): void {
    const htmlElement = this._document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }
  /**
   * Obtiene el tema inicial de localStorage o preferencia del sistema
   * @returns {boolean} Verdadero si se debe habilitar el modo oscuro
   */
  private _getInitialTheme(): boolean {
    // Comprobar localStorage primero
    const saved = this._localStorageService.get(this._localStorageKey);
    if (saved !== null) {
      return saved === 'dark';
    }

    // Recurrir a la preferencia del sistema
    return (
      (this._windowService?.nativeWindow?.matchMedia &&
        this._windowService.nativeWindow.matchMedia('(prefers-color-scheme: dark)').matches) ??
      false
    );
  }
  /**
   * Guarda la preferencia de tema en localStorage
   * @param {boolean} isDark - Verdadero para modo oscuro, falso para modo claro
   */
  private _saveThemePreference(isDark: boolean): void {
    this._localStorageService.set(this._localStorageKey, isDark ? 'dark' : 'light');
  }

  /**
   * Establece el tema explícitamente
   * @param {boolean} isDark - Verdadero para modo oscuro, falso para modo claro
   */
  setTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    this._saveThemePreference(isDark);
  }
  /**
   * Alterna entre modo claro y oscuro
   */
  toggleTheme(): void {
    this.isDarkMode.update((current) => !current);
    this._saveThemePreference(this.isDarkMode());
  }
}
