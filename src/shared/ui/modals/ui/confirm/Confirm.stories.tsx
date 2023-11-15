import type { Meta, StoryObj } from '@storybook/react';
import { Confirm } from './Confirm';
import { themeDecorator } from 'config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/modals/Confirm',
  component: Confirm,
} satisfies Meta<typeof Confirm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
