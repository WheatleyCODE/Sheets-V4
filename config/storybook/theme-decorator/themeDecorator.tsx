import { Story } from '@storybook/react';
import { Theme } from 'app/providers/lib/theme-context';
import { ThemeProvider } from 'app/providers/theme-provider';

export const themeDecorator = (theme: Theme) => (Story: Story) => {
  return (
    <ThemeProvider>
      <div className={`app ${theme}`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};
