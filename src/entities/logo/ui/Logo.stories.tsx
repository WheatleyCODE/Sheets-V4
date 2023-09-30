import type { Meta, StoryObj } from '@storybook/react';
import { t } from 'i18next';
import { Logo } from './Logo';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';

const meta = {
  title: 'entities/Logo',
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    t,
    theme: Theme.LIGHT,
  },
};

export const Dark: Story = {
  args: {
    t,
    theme: Theme.DARK,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
