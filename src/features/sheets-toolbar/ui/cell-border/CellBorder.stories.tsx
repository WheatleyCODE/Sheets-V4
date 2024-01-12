import type { Meta, StoryObj } from '@storybook/react';
import { CellBorder } from './CellBorder';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/sheets-toolbar/CellBorder',
  component: CellBorder,
} satisfies Meta<typeof CellBorder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
