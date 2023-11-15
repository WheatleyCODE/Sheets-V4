import type { Preview } from '@storybook/react';
import { styleDecorator } from './style-decorator/styleDecorator';
import { themeDecorator } from './theme-decorator/themeDecorator';
import { routerDecorator } from './router-decorator/routerDecorator';
import { storeDecorator } from './store-decorator/storeDecorator';
import { translationDecorator } from './translation-decorator/translationDecorator';
import '../../src/shared/lib/prelude/prelude/prelude';

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
  themeDecorator('light'),
  translationDecorator,
  storeDecorator(),
  styleDecorator,
  routerDecorator,
];

export default preview;
