import type { Meta, StoryObj } from '@storybook/react';
import { InputOptionsMenuItem } from './InputOptionsMenuItem';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';
import { MdHome } from 'react-icons/md';

const meta = {
  title: 'shared/input/InputOptionsMenuItem',
  component: InputOptionsMenuItem,
} satisfies Meta<typeof InputOptionsMenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    item: { text: 'item' },
    onClick: () => {},
  },
};

export const Dark: Story = {
  args: {
    item: { text: 'item' },
    onClick: () => {},
  },
  decorators: [themeDecorator('dark')],
};

export const Icon: Story = {
  args: {
    item: { text: 'item', Icon: MdHome },
    onClick: () => {},
  },
};
