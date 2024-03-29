import type { Meta, StoryObj } from '@storybook/react';
import { Functions } from './Functions';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/sheets/Functions',
  component: Functions,
} satisfies Meta<typeof Functions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
