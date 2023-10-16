import { useCallback, useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext';
import { KVFactory } from 'shared/lib/kv-storage/kv-storage/kvStorage';
import { LS_DEFAULT_NAMESPACE, LS_THEME_KEY } from 'shared/consts/local-storage/localStorage';

interface IUseThemeResult {
  setTheme: (newTheme: Theme) => void;
  theme: Theme;
}

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export const useTheme = (): IUseThemeResult => {
  const { theme, setTheme: setThemeState } = useContext(ThemeContext);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      ls.set(LS_THEME_KEY, newTheme);
    },
    [setThemeState],
  );

  return {
    theme,
    setTheme,
  };
};
