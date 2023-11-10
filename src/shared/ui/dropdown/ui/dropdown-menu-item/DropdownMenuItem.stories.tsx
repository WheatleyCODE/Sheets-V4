import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenuItem } from './DropdownMenuItem';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from '@/app/providers/lib';
import { MdHome } from 'react-icons/md';

const meta = {
  title: 'shared/dropdown/DropdownMenuItem',
  component: DropdownMenuItem,
} satisfies Meta<typeof DropdownMenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    text: 'Свет',
  },
};

export const Dark: Story = {
  args: {
    text: 'Темнота',
  },
  decorators: [themeDecorator(Theme.DARK)],
};

export const Icon: Story = {
  args: {
    Icon: MdHome,
    text: 'Темнота',
  },
  decorators: [themeDecorator(Theme.DARK)],
};
