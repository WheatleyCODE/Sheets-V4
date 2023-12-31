import type { Meta, StoryObj } from '@storybook/react';
import { ControllableMenuItem } from './ControllableMenuItem';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'changeTitle/ControllableMenuItem',
  component: ControllableMenuItem,
} satisfies Meta<typeof ControllableMenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {} as any,
};

export const Dark: Story = {
  args: {} as any,
  decorators: [themeDecorator('dark')],
};
