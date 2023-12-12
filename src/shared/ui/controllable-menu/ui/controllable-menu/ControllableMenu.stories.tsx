import type { Meta, StoryObj } from '@storybook/react';
import { ControllableMenu } from './ControllableMenu';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/controllableMenu/ControllableMenu',
  component: ControllableMenu,
} satisfies Meta<typeof ControllableMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
