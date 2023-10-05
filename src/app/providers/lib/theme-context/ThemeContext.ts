import { createContext } from 'react';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  TOXIC = 'toxic',
}

export interface IThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initContext: IThemeContextProps = { theme: Theme.LIGHT, setTheme: () => {} };

export const ThemeContext = createContext<IThemeContextProps>(initContext);
