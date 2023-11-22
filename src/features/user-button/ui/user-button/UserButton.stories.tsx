import type { Meta, StoryObj } from '@storybook/react';
import { UserButton } from './UserButton';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/UserButton',
  component: UserButton,
} satisfies Meta<typeof UserButton>;

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
  decorators: [themeDecorator('dark')],
};
