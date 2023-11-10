import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from '@/app/providers/lib';
import { storeDecorator } from '../../../../config/storybook/store-decorator/storeDecorator';

const meta = {
  title: 'widgets/Navbar',
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};

export const Auth: Story = {
  args: {},
  decorators: [storeDecorator({ user: { user: { email: 'ya@mail.ru', id: '1' } } })],
};
