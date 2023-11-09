import type { Meta, StoryObj } from '@storybook/react';
import { DragLine } from './DragLine';
import { Theme } from 'app/providers/lib';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';
import { DragLineItem } from '../drag-line-item/DragLineItem';

const meta = {
  title: 'shared/drag-line/DragLine',
  component: DragLine,
} satisfies Meta<typeof DragLine>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  { width: 100, itemId: 1, children: <h1>Drag1</h1> },
  { width: 100, itemId: 2, children: <h1>Drag2</h1> },
  { width: 100, itemId: 3, children: <h1>Drag3</h1> },
  { width: 100, itemId: 4, children: <h1>Drag4</h1> },
];

export const Light: Story = {
  args: {
    items,
  },
};

export const Dark: Story = {
  args: {
    items,
  },
  decorators: [themeDecorator(Theme.DARK)],
};

export const Construct: Story = {
  args: {
    children: (
      <>
        <DragLineItem width={100} itemId={1} children={<h1>Drag1</h1>} />
        <DragLineItem width={100} itemId={2} children={<h1>Drag2</h1>} />
        <DragLineItem width={100} itemId={3} children={<h1>Drag3</h1>} />
        <DragLineItem width={100} itemId={4} children={<h1>Drag4</h1>} />
      </>
    ),
  },
};
