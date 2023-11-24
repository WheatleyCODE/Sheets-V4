import { useCallback, useContext } from 'react';
import { ThemeContext } from '../../../../shared/lib/contexts/theme-context/ThemeContext';
import { KVFactory } from '../../kv-storage';
import { LS_DEFAULT_NAMESPACE, LS_THEME_KEY } from '@/shared/consts/local-storage/localStorage';
import type { IUseThemeResult } from './useTheme.interface';
import type { Theme } from '../../../../shared/lib/contexts/theme-context/ThemeContext.interface';

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