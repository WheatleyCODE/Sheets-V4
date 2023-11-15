import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';
import { DrawerOpenStyles } from './Drawer.consts';

const meta = {
  title: 'shared/modals/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    openStyles: DrawerOpenStyles.LEFT,
    children: <h1>Drawer</h1>,
  },
};

export const Dark: Story = {
  args: {
    openStyles: DrawerOpenStyles.LEFT,
    children: <h1>Drawer</h1>,
  },
  decorators: [themeDecorator('dark')],
};

export const Top: Story = {
  args: {
    openStyles: DrawerOpenStyles.TOP,
    children: <h1>Drawer</h1>,
  },
};

export const Left: Story = {
  args: {
    openStyles: DrawerOpenStyles.LEFT,
    children: <h1>Drawer</h1>,
  },
};

export const Right: Story = {
  args: {
    openStyles: DrawerOpenStyles.RIGHT,
    children: <h1>Drawer</h1>,
  },
};

export const Bottom: Story = {
  args: {
    openStyles: DrawerOpenStyles.BOTTOM,
    children: <h1>Drawer</h1>,
  },
};
