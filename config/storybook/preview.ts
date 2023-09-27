import type { Preview } from '@storybook/react';
import { styleDecorator } from './style-decorator/styleDecorator';
import { themeDecorator } from './theme-decorator/themeDecorator';
import { Theme } from 'app/providers';
import { routerDecorator } from './router-decorator/routerDecorator';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [routerDecorator, styleDecorator, themeDecorator(Theme.LIGHT)];

export default preview;