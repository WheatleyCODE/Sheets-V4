import { useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext';
import { KVFactory } from 'shared/lib/kv-storage/kvStorage';
import { LS_DEFAULT_NAMESPACE, LS_THEME_KEY } from 'shared/consts/local-storage/localStorage';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

const localStorage = KVFactory(LS_DEFAULT_NAMESPACE);

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme(newTheme);
    localStorage.set(LS_THEME_KEY, newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
};
