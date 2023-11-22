export type Theme = 'dark' | 'light' | 'toxic';

export interface IThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
