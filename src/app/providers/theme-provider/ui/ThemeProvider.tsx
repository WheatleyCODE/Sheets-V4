import { FC, useLayoutEffect, useMemo, useState } from 'react';
import { KVFactory } from 'shared/lib/kv-storage/kvStorage';
import { Theme, ThemeContext } from 'app/providers/lib/ThemeContext';
import { LS_DEFAULT_NAMESPACE, LS_THEME_KEY } from 'shared/consts/local-storage/localStorage';

const localStorage = KVFactory(LS_DEFAULT_NAMESPACE);

export const ThemeProvider: FC<FCProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useLayoutEffect(() => {
    localStorage.get<Theme>(LS_THEME_KEY).then((value) => setTheme(value));
  }, []);

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
