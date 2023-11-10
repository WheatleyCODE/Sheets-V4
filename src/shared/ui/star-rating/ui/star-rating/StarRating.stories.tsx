import type { Meta, StoryObj } from '@storybook/react';
import { StarRating } from './StarRating';
import { themeDecorator } from 'config/storybook/theme-decorator/themeDecorator';
import { Theme } from '@/app/providers/lib';

const meta = {
  title: 'shared/StarRating',
  component: StarRating,
} satisfies Meta<typeof StarRating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
