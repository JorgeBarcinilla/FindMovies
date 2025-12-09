import { Component, input, output } from '@angular/core';

import { SignalPipe } from '../../../pipes/signal.pipe';

export interface TabOption {
  label: string;
  value: string;
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
  activeTab = input.required<string>();
  tabChange = output<string>();
  tabs = input.required<TabOption[]>();

  /**
   * Maneja el clic en la pestaña
   * @param {string} value - Valor de la pestaña
   */
  protected onTabClick(value: string): void {
    this.tabChange.emit(value);
  }
}
