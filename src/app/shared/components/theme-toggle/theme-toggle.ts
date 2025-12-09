import { Component, inject } from '@angular/core';

import { ThemeService } from '../../../core/services/theme.service';
import { SignalPipe } from '../../../pipes/signal.pipe';

/**
 * Componente de botón de alternancia de tema
 * Cambia entre modo claro y oscuro con transiciones suaves
 */
@Component({
  imports: [SignalPipe],
  selector: 'app-theme-toggle',
  styleUrl: './theme-toggle.css',
  templateUrl: './theme-toggle.html'
})
export class ThemeToggleComponent {
  protected readonly _themeService = inject(ThemeService);

  protected readonly isDarkMode = this._themeService.isDarkMode;

  /**
   * Alterna el tema
   */
  protected toggleTheme(): void {
    this._themeService.toggleTheme();
  }
}
