import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Theme } from 'app/providers';
import { MdOutlineEmail } from 'react-icons/md';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    value: '',
    type: 'text',
    isError: false,
    isActive: false,
    validError: null,
  },
};

export const Dark: Story = {
  args: {
    value: '',
    type: 'text',
    isError: false,
    isActive: false,
    validError: null,
  },
  decorators: [themeDecorator(Theme.DARK)],
};

export const Icon: Story = {
  args: {
    value: '',
    Icon: MdOutlineEmail,
    type: 'text',
    isError: false,
    isActive: false,
    validError: null,
  },
};

export const Active: Story = {
  args: {
    value: 'Инпут',
    Icon: MdOutlineEmail,
    type: 'text',
    isError: false,
    isActive: true,
    validError: null,
  },
};

export const Error: Story = {
  args: {
    value: 'Инпут',
    Icon: MdOutlineEmail,
    type: 'text',
    isError: true,
    isActive: true,
    validError: 'Ошибка',
  },
};
