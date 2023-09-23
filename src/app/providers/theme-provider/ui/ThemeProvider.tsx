import { FC, useLayoutEffect, useMemo, useState } from "react";
import { KVFactory } from "shared/lib/kv-storage/kvStorage";
import {
  LOCAL_STORAGE_THEME_KEY,
  LOCAL_STORAGE_THEME_NAMESPACE,
  Theme,
  ThemeContext,
} from "app/providers/lib/ThemeContext";

const localStorage = KVFactory(LOCAL_STORAGE_THEME_NAMESPACE);

export const ThemeProvider: FC<FCProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useLayoutEffect(() => {
    // todo добавить SyncPromise
    localStorage
      .get<Theme>(LOCAL_STORAGE_THEME_KEY)
      .then((value) => setTheme(value));
  }, []);

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
