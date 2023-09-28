import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';
import { DrawerOpenStyles } from './interface';

const meta = {
  title: 'shared/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

// ! Fix loki error
// export const Light: Story = {
//   args: {
//     openStyles: DrawerOpenStyles.TOP,
//     isAnimation: false,
//     children: <h1>Drawer</h1>,
//   },
// };

// export const Dark: Story = {
//   args: {
//     openStyles: DrawerOpenStyles.TOP,
//     isAnimation: false,
//     children: <h1>Drawer</h1>,
//   },
//   decorators: [themeDecorator(Theme.DARK)],
// };

// export const Left: Story = {
//   args: {
//     openStyles: DrawerOpenStyles.LEFT,
//     isAnimation: false,
//     children: <h1>Drawer</h1>,
//   },
//   decorators: [themeDecorator(Theme.DARK)],
// };

// export const Right: Story = {
//   args: {
//     openStyles: DrawerOpenStyles.RIGHT,
//     isAnimation: false,
//     children: <h1>Drawer</h1>,
//   },
//   decorators: [themeDecorator(Theme.DARK)],
// };

// export const Bottom: Story = {
//   args: {
//     openStyles: DrawerOpenStyles.BOTTOM,
//     isAnimation: false,
//     children: <h1>Drawer</h1>,
//   },
//   decorators: [themeDecorator(Theme.DARK)],
// };
