import type { Meta, StoryObj } from '@storybook/react';
import { t } from 'i18next';
import { NavigationMenu } from './NavigationMenu';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';

const meta = {
  title: 'features/NavigationMenu',
  component: NavigationMenu,
} satisfies Meta<typeof NavigationMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    t,
  },
};

export const Dark: Story = {
  args: {
    t,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
