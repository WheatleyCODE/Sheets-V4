import { FC, useEffect, useMemo, useState } from 'react';
import { useUser, useGetClientSettingsByKey } from '@/entities/user';
import { Theme, ThemeContext } from '@/shared/lib/contexts';
import type { IThemeProviderProps } from './ThemeProvider.interface';

export const ThemeProvider: FC<IThemeProviderProps> = ({ children, initTheme = 'light' }) => {
  const [theme, setTheme] = useState<Theme>(initTheme);
  const user = useUser();
  const themeFromClientSettings = useGetClientSettingsByKey('[[SheetsV4-theme]]');

  useEffect(() => {
    if (themeFromClientSettings) {
      setTheme(themeFromClientSettings);
      return;
    }

    if (!user) {
      setTheme('light');
    }
  }, [user, themeFromClientSettings]);

  const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
