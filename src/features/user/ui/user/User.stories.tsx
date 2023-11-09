import type { Meta, StoryObj } from '@storybook/react';
import { User } from './User';
import { Theme } from 'app/providers/lib';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/User',
  component: User,
} satisfies Meta<typeof User>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    openAuth: () => {},
    logout: () => {},
    user: { email: 'ya@mail.ru', id: '1' },
  },
};

export const Dark: Story = {
  args: {
    openAuth: () => {},
    logout: () => {},
    user: { email: 'ya@mail.ru', id: '1' },
  },
  decorators: [themeDecorator(Theme.DARK)],
};
