import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers/lib/theme-context';
import { DropdownMenu } from '../dropdown-menu/DropdownMenu';
import { DropdownMenuItem } from '../dropdown-menu-item/DropdownMenuItem';

const meta = {
  title: 'shared/Dropdown',
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: <h1>Dropdown</h1>,
  },
};

export const Dark: Story = {
  args: {
    children: <h1>Dropdown</h1>,
  },
  decorators: [themeDecorator(Theme.DARK)],
};

export const Full: Story = {
  args: {
    children: (
      <DropdownMenu>
        <DropdownMenuItem text="Итем" />
        <DropdownMenuItem text="Итем1" />
        <DropdownMenuItem text="Итем2" />
        <DropdownMenuItem text="Итем3" />
      </DropdownMenu>
    ),
  },
};
