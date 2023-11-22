import { Story } from '@storybook/react';
import { ThemeProvider } from '@/app/providers/theme-provider';
import { Theme } from '@/shared/lib/contexts';

export const themeDecorator = (theme: Theme) => (Story: Story) => {
  return (
    <ThemeProvider>
      <div className={`app ${theme}`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};
