import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: <h1>Card</h1>,
  },
};

export const Dark: Story = {
  args: {
    children: <h1>Card</h1>,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
