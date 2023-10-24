import type { Meta, StoryObj } from '@storybook/react';
import { DragLineItem } from './DragLineItem';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/drag-line/DragLineItem',
  component: DragLineItem,
} satisfies Meta<typeof DragLineItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    width: 100,
    children: <h1>DragLineItem</h1>,
    itemId: 1,
  },
};

export const Dark: Story = {
  args: {
    width: 100,
    children: <h1>DragLineItem</h1>,
    itemId: 2,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
