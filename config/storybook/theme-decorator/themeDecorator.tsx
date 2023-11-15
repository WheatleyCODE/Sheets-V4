import { Story } from '@storybook/react';
import { ThemeProvider } from '@/app/providers/theme-provider';
import type { Theme } from '@/app/providers/lib';

export const themeDecorator = (theme: Theme) => (Story: Story) => {
  return (
    <ThemeProvider>
      <div className={`app ${theme}`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};
