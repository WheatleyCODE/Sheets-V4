import type { Meta, StoryObj } from '@storybook/react';
import { TabItem } from './TabItem';
import { Theme } from 'app/providers/lib';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/tabs/TabItem',
  component: TabItem,
} satisfies Meta<typeof TabItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: <h1>TabItem</h1>,
    value: '1',
    itemId: 1,
  },
};

export const Dark: Story = {
  args: {
    children: <h1>TabItem</h1>,
    value: '1',
    itemId: 1,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
