import { FC, useMemo, useState } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

const initTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) ||
  Theme.LIGHT) as Theme;

export const ThemeProvider: FC<FCProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(initTheme);

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
