import { Component, inject, input, output } from '@angular/core';

import { MoviesStore, TrendingTab } from '../../../core/store/movies.store';
import { SignalPipe } from '../../../pipes/signal.pipe';

export interface TabOption {
  label: string;
  value: TrendingTab;
}

/**
 * Componente de cambio de pestaña para cambiar entre diferentes vistas
 */
@Component({
  imports: [SignalPipe],
  selector: 'app-tab-switcher',
  styleUrl: './tab-switcher.css',
  templateUrl: './tab-switcher.html'
})
export class TabSwitcherComponent {
  private readonly _moviesStore = inject(MoviesStore);

  activeTab = input.required<TrendingTab>();
  tabChange = output<TrendingTab>();
  tabs = input.required<TabOption[]>();

  /**
   * Maneja el clic en la pestaña
   * @param {TrendingTab} value - Valor de la pestaña
   */
  protected onTabClick(value: TrendingTab): void {
    this._moviesStore.onTrendingTabChange(value);
  }
}
