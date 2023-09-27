import { Story } from '@storybook/react';
import { Theme } from 'app/providers';

export const themeDecorator = (theme: Theme) => (Story: Story) => {
  return (
    <div className={`app ${theme}`}>
      <Story />
    </div>
  );
};
