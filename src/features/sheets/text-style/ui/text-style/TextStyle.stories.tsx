import type { Meta, StoryObj } from '@storybook/react';
import { TextStyle } from './TextStyle';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/sheets/TextStyle',
  component: TextStyle,
} satisfies Meta<typeof TextStyle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
