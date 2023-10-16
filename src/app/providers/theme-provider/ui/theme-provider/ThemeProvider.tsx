import { FC, useLayoutEffect, useMemo, useState } from 'react';
import { KVFactory } from 'shared/lib/kv-storage/kv-storage/kvStorage';
import { Theme, ThemeContext } from 'app/providers/lib/theme-context';
import { LS_DEFAULT_NAMESPACE, LS_THEME_KEY } from 'shared/consts/local-storage/localStorage';

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export interface IThemeProviderProps extends FCProps {
  initTheme?: Theme;
}

export const ThemeProvider: FC<IThemeProviderProps> = ({ children, initTheme = Theme.LIGHT }) => {
  const [theme, setTheme] = useState<Theme>(initTheme);

  useLayoutEffect(() => {
    ls.get<Theme>(LS_THEME_KEY).then((value) => value && setTheme(value));
  }, []);

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
