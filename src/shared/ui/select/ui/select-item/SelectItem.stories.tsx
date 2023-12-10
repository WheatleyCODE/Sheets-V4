import type { Meta, StoryObj } from '@storybook/react';
import { SelectItem } from './SelectItem';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/select//SelectItem',
  component: SelectItem,
} satisfies Meta<typeof SelectItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    item: { text: 'text', value: 'value' },
    onChange: () => {},
  },
};

export const Dark: Story = {
  args: {
    item: { text: 'text', value: 'value' },
    onChange: () => {},
  },
  decorators: [themeDecorator('dark')],
};
