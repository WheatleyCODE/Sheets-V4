import { useCallback, useContext } from 'react';
import { ThemeContext } from '../../../../shared/lib/contexts/theme-context/ThemeContext';
import { KVFactory } from '../../kv-storage';
import { STORAGE_NAMESPACE, LS_THEME_KEY } from '@/shared/consts';
import type { IUseThemeResult, SetTheme } from './useTheme.interface';

export const useTheme = (): IUseThemeResult => {
  const { theme, setTheme: setThemeState } = useContext(ThemeContext);

  const setTheme: SetTheme = useCallback(
    (newTheme, engine) => {
      const kvStorage = KVFactory(STORAGE_NAMESPACE, engine);

      setThemeState(newTheme);
      return kvStorage.set(LS_THEME_KEY, newTheme);
    },
    [setThemeState],
  );

  return {
    theme,
    setTheme,
  };
};
