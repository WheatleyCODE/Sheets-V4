import type { Meta, StoryObj } from '@storybook/react';
import { CellRow } from './CellRow';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/cell/CellRow',
  component: CellRow,
} satisfies Meta<typeof CellRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
