import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import { themeDecorator } from '../../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/dropdown/DropdownMenu',
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: <h1>DropdownMenu</h1>,
  },
};

export const Dark: Story = {
  args: {
    children: <h1>DropdownMenu</h1>,
  },
  decorators: [themeDecorator('dark')],
};
