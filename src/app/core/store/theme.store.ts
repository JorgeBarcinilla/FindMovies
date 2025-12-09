import { inject } from '@angular/core';
import { signalStore, withMethods, withState } from '@ngrx/signals';

import { ThemeService } from '../services/theme.service';
interface ThemeState {
  isDarkMode: boolean;
}
export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState<ThemeState>(() => {
    const themeService = inject(ThemeService);
    return {
      isDarkMode: themeService.isDarkMode()
    };
  }),
  withMethods((store, themeService = inject(ThemeService)) => ({
    setTheme: (isDark: boolean) => {
      themeService.setTheme(isDark);
    },
    toggleTheme: () => {
      themeService.toggleTheme();
    }
  }))
);
