import type { Meta, StoryObj } from '@storybook/react';
import { FontFamily } from './FontFamily';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/sheets-toolbar/FontFamily',
  component: FontFamily,
} satisfies Meta<typeof FontFamily>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
