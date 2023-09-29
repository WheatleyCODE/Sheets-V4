import { Story } from '@storybook/react';
import { Theme, ThemeProvider } from 'app/providers';

export const themeDecorator = (theme: Theme) => (Story: Story) => {
  return (
    <ThemeProvider>
      <div className={`app ${theme}`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};
