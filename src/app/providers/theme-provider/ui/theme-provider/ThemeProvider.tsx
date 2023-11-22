import { FC, useLayoutEffect, useMemo, useState } from 'react';
import { KVFactory } from '@/shared/lib/kv-storage/kv-storage/kvStorage';
import { LS_DEFAULT_NAMESPACE, LS_THEME_KEY } from '@/shared/consts/local-storage/localStorage';
import { Theme, ThemeContext } from '@/shared/lib/contexts';
import type { IThemeProviderProps } from './ThemeProvider.interface';

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export const ThemeProvider: FC<IThemeProviderProps> = ({ children, initTheme = 'light' }) => {
  const [theme, setTheme] = useState<Theme>(initTheme);

  useLayoutEffect(() => {
    ls.get<Theme>(LS_THEME_KEY).then((value) => value && setTheme(value));
  }, []);

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
