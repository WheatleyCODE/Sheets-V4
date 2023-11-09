import { createContext } from 'react';
import { Theme } from './model/consts/ThemeContext.consts';
import type { IThemeContextProps } from './ThemeContext.interface';

const initContext: IThemeContextProps = { theme: Theme.LIGHT, setTheme: () => {} };

export const ThemeContext = createContext<IThemeContextProps>(initContext);
