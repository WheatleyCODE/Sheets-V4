import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';
import { TabItem } from '../tab-item/TabItem';

const meta = {
  title: 'shared/tabs/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const tabItems = [
  { value: '1', itemId: 1, children: <h1>Tab1</h1> },
  { value: '2', itemId: 2, children: <h1>Tab2</h1> },
  { value: '3', itemId: 3, children: <h1>Tab3</h1> },
  { value: '4', itemId: 4, children: <h1>Tab4</h1> },
];

export const Light: Story = {
  args: {
    initValue: '1',
    tabItems,
  },
};

export const Dark: Story = {
  args: {
    initValue: '2',
    tabItems,
  },
  decorators: [themeDecorator('dark')],
};

export const Construct: Story = {
  args: {
    initValue: '1',
    children: (
      <>
        <TabItem itemId={1} value="1">
          <h1>Tab1</h1>
        </TabItem>
        <TabItem itemId={2} value="2">
          <h1>Tab2</h1>
        </TabItem>
        <TabItem itemId={3} value="3">
          <h1>Tab3</h1>
        </TabItem>
        <TabItem itemId={4} value="4">
          <h1>Tab4</h1>
        </TabItem>
      </>
    ),
  },
};
