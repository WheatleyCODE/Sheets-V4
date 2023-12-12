import type { Meta, StoryObj } from '@storybook/react';
import { ControllableMenuItem } from './ControllableMenuItem';
import { Theme } from 'app/providers/lib/theme-context';

themeDecora

const meta = {
  title: 'changeTitle/ControllableMenuItem',
  component: ControllableMenuItem,
} satisfies Meta<typeof ControllableMenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
