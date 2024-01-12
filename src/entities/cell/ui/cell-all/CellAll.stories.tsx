import type { Meta, StoryObj } from '@storybook/react';
import { CellAll } from './CellAll';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/cell/CellAll',
  component: CellAll,
} satisfies Meta<typeof CellAll>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
