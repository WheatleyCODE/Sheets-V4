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

// export const Dark: Story = {
//   args: {
//     value: '',
//     type: 'text',
//     isError: false,
//     isActive: false,
//     validError: null,
//   },
//   decorators: [themeDecorator('dark')],
// };

// export const Icon: Story = {
//   args: {
//     value: '',
//     Icon: MdOutlineEmail,
//     type: 'text',
//     isError: false,
//     isActive: false,
//     validError: null,
//   },
// };

// export const Active: Story = {
//   args: {
//     value: 'Инпут',
//     Icon: MdOutlineEmail,
//     type: 'text',
//     isError: false,
//     isActive: true,
//     validError: null,
//   },
// };

// export const Error: Story = {
//   args: {
//     value: 'Инпут',
//     Icon: MdOutlineEmail,
//     type: 'text',
//     isError: true,
//     isActive: true,
//     validError: 'Ошибка',
//   },
// };
