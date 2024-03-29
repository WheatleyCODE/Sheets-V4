import type { Meta, StoryObj } from '@storybook/react';
import { Cell } from './Cell';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/cell/Cell',
  component: Cell,
} satisfies Meta<typeof Cell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    id: 'idd',
    value: 'value',
  },
};

export const Dark: Story = {
  args: {
    id: 'idd',
    value: 'value',
  },
  decorators: [themeDecorator('dark')],
};
