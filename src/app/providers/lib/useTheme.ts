import { useContext } from "react";
import {
  LOCAL_STORAGE_THEME_NAMESPACE,
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from "./ThemeContext";
import { KVFactory } from "shared/lib/kv-storage/kvStorage";

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

const localStorage = KVFactory(LOCAL_STORAGE_THEME_NAMESPACE);

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme(newTheme);
    localStorage.set(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
};
