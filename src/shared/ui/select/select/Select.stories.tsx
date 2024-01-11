import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    input: {} as any,
    controllableMenu: {} as any,
    select: {} as any,
    selectRef: {} as any,
  },
};

export const Dark: Story = {
  args: {
    input: {} as any,
    controllableMenu: {} as any,
    select: {} as any,
    selectRef: {} as any,
  },
  decorators: [themeDecorator('dark')],
};
