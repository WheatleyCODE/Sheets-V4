import type { Meta, StoryObj } from '@storybook/react';
import { Backdrop } from './Backdrop';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from '@/app/providers/lib';

const meta = {
  title: 'shared/Backdrop',
  component: Backdrop,
} satisfies Meta<typeof Backdrop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: <h1>Backdrop</h1>,
  },
};

export const Dark: Story = {
  args: {
    children: <h1>Backdrop</h1>,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
