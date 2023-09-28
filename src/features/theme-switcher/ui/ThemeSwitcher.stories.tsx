import type { Meta, StoryObj } from '@storybook/react';
import { t } from 'i18next';
import { ThemeSwitcher } from './ThemeSwitcher';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';

const meta = {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
} satisfies Meta<typeof ThemeSwitcher>;

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
