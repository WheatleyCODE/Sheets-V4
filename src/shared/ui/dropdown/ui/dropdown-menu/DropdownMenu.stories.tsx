import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers/lib/theme-context';

const meta = {
  title: 'shared/DropdownMenu',
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
  decorators: [themeDecorator(Theme.DARK)],
};
