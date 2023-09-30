import type { Meta, StoryObj } from '@storybook/react';
import { User } from './User';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';

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
