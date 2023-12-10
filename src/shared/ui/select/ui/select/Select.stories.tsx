import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/select/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    items: [],
  },
};

export const Dark: Story = {
  args: {
    items: [],
  },
  decorators: [themeDecorator('dark')],
};
