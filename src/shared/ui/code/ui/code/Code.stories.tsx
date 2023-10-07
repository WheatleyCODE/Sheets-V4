import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';
import { Theme } from 'app/providers/lib/theme-context';

themeDecora

const meta = {
  title: 'changeTitle/Code',
  component: Code,
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
