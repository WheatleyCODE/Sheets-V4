import type { Meta, StoryObj } from '@storybook/react';
import { t } from 'i18next';
import { User } from './User';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';

const meta = {
  title: 'features/User',
  component: User,
} satisfies Meta<typeof User>;

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
