import type { Meta, StoryObj } from '@storybook/react';
import { PaletteListItem } from './PaletteListItem';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/palette/PaletteListItem',
  component: PaletteListItem,
} satisfies Meta<typeof PaletteListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    color: 'red',
    title: 'Red',
  },
};

export const Dark: Story = {
  args: {
    color: 'red',
    title: 'Red',
  },
  decorators: [themeDecorator('dark')],
};
