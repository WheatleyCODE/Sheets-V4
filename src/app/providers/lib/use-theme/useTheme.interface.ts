import type { Theme } from '../theme-context/ThemeContext.interface';

export interface IUseThemeResult {
  setTheme: (newTheme: Theme) => void;
  theme: Theme;
}
