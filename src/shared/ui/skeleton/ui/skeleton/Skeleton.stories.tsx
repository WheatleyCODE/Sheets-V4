import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { Theme } from '@/app/providers/lib';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    width: 300,
    height: 100,
    borderRadius: '10px',
  },
};

export const Dark: Story = {
  args: {
    width: 300,
    height: 100,
    borderRadius: '10px',
  },
  decorators: [themeDecorator(Theme.DARK)],
};

export const Circle: Story = {
  args: {
    width: 100,
    height: 100,
    borderRadius: '50%',
  },
};
