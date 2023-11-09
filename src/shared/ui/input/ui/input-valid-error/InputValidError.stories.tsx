import type { Meta, StoryObj } from '@storybook/react';
import { InputValidError } from './InputValidError';
import { Theme } from 'app/providers/lib';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/input/InputValidError',
  component: InputValidError,
} satisfies Meta<typeof InputValidError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    validError: 'Ошибка валидации',
  },
};

export const Dark: Story = {
  args: {
    validError: 'Ошибка валидации',
  },
  decorators: [themeDecorator(Theme.DARK)],
};
