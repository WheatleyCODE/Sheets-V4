import type { Meta, StoryObj } from '@storybook/react';
import { FontSize } from './FontSize';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/sheets-toolbar/FontSize',
  component: FontSize,
} satisfies Meta<typeof FontSize>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
