import type { Meta, StoryObj } from '@storybook/react';
import { MobileDrawer } from './MobileDrawer';
import { themeDecorator } from 'config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/modals/MobileDrawer',
  component: MobileDrawer,
} satisfies Meta<typeof MobileDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
