import type { Meta, StoryObj } from '@storybook/react';
import { ControllableMenu } from './ControllableMenu';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/controllable-menu/ControllableMenu',
  component: ControllableMenu,
} satisfies Meta<typeof ControllableMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    items: [],
    menuRef: {} as any,
    menuState: { index: 0 },
    key: '1',
  },
};

export const Dark: Story = {
  args: {
    items: [],
    menuRef: {} as any,
    menuState: { index: 0 },
    key: '1',
  },
  decorators: [themeDecorator('dark')],
};
