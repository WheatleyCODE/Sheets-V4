import { createContext } from 'react';
import type { IThemeContextProps } from './ThemeContext.interface';

const initContext: IThemeContextProps = { theme: 'light', setTheme: () => {} };

export const ThemeContext = createContext<IThemeContextProps>(initContext);
