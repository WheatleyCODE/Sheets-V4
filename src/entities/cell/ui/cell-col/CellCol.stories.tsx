import type { Meta, StoryObj } from '@storybook/react';
import { CellCol } from './CellCol';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/cell/CellCol',
  component: CellCol,
} satisfies Meta<typeof CellCol>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    id: 10,
    value: 'A',
    width: 100,
  },
};

export const Dark: Story = {
  args: {
    id: 10,
    value: 'A',
    width: 100,
  },
  decorators: [themeDecorator('dark')],
};
