import type { Meta, StoryObj } from '@storybook/react';
import { CircleLoader } from './CircleLoader';
import { themeDecorator } from 'config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/loaders/CircleLoader',
  component: CircleLoader,
} satisfies Meta<typeof CircleLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
