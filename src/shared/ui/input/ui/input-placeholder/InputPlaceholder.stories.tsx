import type { Meta, StoryObj } from '@storybook/react';
import { InputPlaceholder } from './InputPlaceholder';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/InputPlaceholder',
  component: InputPlaceholder,
} satisfies Meta<typeof InputPlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    placeholder: 'InputPlaceholder',
  },
};

export const Dark: Story = {
  args: {
    placeholder: 'InputPlaceholder',
  },
  decorators: [themeDecorator(Theme.DARK)],
};
