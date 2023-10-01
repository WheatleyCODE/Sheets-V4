import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';
import { Theme } from 'app/providers';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';
import { storeDecorator } from '../../../../../config/storybook/store-decorator/storeDecorator';

const meta = {
  title: 'features/LoginForm',
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};

export const Data: Story = {
  args: {},
  decorators: [storeDecorator({ login: { email: 'ya@mail.ru', password: '123456' } })],
};

export const Error: Story = {
  args: {},
  decorators: [
    storeDecorator({ login: { email: 'ya@mail.ru', password: '123456', error: 'Неправильная почта или пароль' } }),
  ],
};
