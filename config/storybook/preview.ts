import type { Preview } from '@storybook/react';
import { styleDecorator } from './style-decorator/styleDecorator';
import { themeDecorator } from './theme-decorator/themeDecorator';
import { Theme } from 'app/providers/lib/theme-context';
import { routerDecorator } from './router-decorator/routerDecorator';
import { storeDecorator } from './store-decorator/storeDecorator';
import { translationDecorator } from './translation-decorator/translationDecorator';

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

export const decorators = [
  themeDecorator(Theme.LIGHT),
  translationDecorator,
  storeDecorator(),
  styleDecorator,
  routerDecorator,
];

export default preview;
