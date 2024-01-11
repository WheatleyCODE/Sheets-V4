import type { Meta, StoryObj } from '@storybook/react';
import { MdHome } from 'react-icons/md';
import { ControllableMenuItem } from './ControllableMenuItem';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/controllable-menu/ControllableMenuItem',
  component: ControllableMenuItem,
} satisfies Meta<typeof ControllableMenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    side: 'right',
    selectItem: () => {},
    item: { text: 'text', value: 'value', Icon: MdHome },
    index: 1,
    changeMenuState: () => {},
    depth: 0,
    menuState: { index: 0 },
    isActive: false,
  },
};

export const Dark: Story = {
  args: {
    side: 'right',
    selectItem: () => {},
    item: { text: 'text', value: 'value', Icon: MdHome },
    index: 1,
    changeMenuState: () => {},
    depth: 0,
    menuState: { index: 0 },
    isActive: false,
  },
  decorators: [themeDecorator('dark')],
};
