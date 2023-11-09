import { Theme } from './model/consts/ThemeContext.consts';

export interface IThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
