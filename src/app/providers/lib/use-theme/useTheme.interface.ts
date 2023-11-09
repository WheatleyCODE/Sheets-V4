import { Theme } from '../theme-context/model/consts/ThemeContext.consts';

export interface IUseThemeResult {
  setTheme: (newTheme: Theme) => void;
  theme: Theme;
}
