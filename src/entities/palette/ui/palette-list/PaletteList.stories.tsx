import type { Meta, StoryObj } from '@storybook/react';
import { PaletteList } from './PaletteList';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/palette/PaletteList',
  component: PaletteList,
} satisfies Meta<typeof PaletteList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
