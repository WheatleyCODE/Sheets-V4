import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { MdOutlineEmail } from 'react-icons/md';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/input/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {} as any,
};

export const Dark: Story = {
  args: {
    value: '',
    type: 'text',
    isError: false,
    validError: null,
    inputRef: {} as any,
    isFocus: false,
    isMouseDown: false,
    isTouched: false,
  },
  decorators: [themeDecorator('dark')],
};

export const Icon: Story = {
  args: {
    value: '',
    Icon: MdOutlineEmail,
    type: 'text',
    isError: false,
    validError: null,
    inputRef: {} as any,
    isFocus: false,
    isMouseDown: false,
    isTouched: false,
  },
};

export const Active: Story = {
  args: {
    value: 'Active',
    Icon: MdOutlineEmail,
    type: 'text',
    isError: false,
    validError: null,
    inputRef: {} as any,
    isFocus: true,
    isMouseDown: false,
    isTouched: false,
  },
};

export const Error: Story = {
  args: {
    value: 'Error',
    Icon: MdOutlineEmail,
    type: 'text',
    isError: false,
    validError: 'Ошибка',
    inputRef: {} as any,
    isFocus: false,
    isMouseDown: false,
    isTouched: false,
  },
};
