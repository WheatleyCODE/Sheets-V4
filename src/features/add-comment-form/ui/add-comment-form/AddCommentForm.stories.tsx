import type { Meta, StoryObj } from '@storybook/react';
import { AddCommentForm } from './AddCommentForm';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
} satisfies Meta<typeof AddCommentForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
