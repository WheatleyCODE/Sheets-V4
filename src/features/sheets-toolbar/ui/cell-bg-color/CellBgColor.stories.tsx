import type { Meta, StoryObj } from '@storybook/react';
import { CellBgColor } from './CellBgColor';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/cell/CellBgColor',
  component: CellBgColor,
} satisfies Meta<typeof CellBgColor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
