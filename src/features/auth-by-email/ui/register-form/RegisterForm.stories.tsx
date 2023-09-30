import type { Meta, StoryObj } from '@storybook/react';
import { RegisterForm } from './RegisterForm';
import { Theme } from 'app/providers';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/RegisterForm',
  component: RegisterForm,
} satisfies Meta<typeof RegisterForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
