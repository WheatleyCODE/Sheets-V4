import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'changeTitle/Snackbar',
  component: Snackbar,
} satisfies Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {} as any,
};

export const Dark: Story = {
  args: {} as any,
  decorators: [themeDecorator('dark')],
};
