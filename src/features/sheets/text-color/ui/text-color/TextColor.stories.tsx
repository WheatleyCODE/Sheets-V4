import type { Meta, StoryObj } from '@storybook/react';
import { TextColor } from './TextColor';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/sheets/TextColor',
  component: TextColor,
} satisfies Meta<typeof TextColor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
