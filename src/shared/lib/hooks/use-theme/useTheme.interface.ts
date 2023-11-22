import type { Theme } from '../../../../shared/lib/contexts/theme-context/ThemeContext.interface';

export interface IUseThemeResult {
  setTheme: (newTheme: Theme) => void;
  theme: Theme;
}
