import type { Meta, StoryObj } from '@storybook/react';
import { AuthModal } from './AuthModal';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';
import { storeDecorator } from '../../../../config/storybook/store-decorator/storeDecorator';

const meta = {
  title: 'widget/AuthModal',
  component: AuthModal,
} satisfies Meta<typeof AuthModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    onClose: () => {},
  },
};

export const Dark: Story = {
  args: {
    onClose: () => {},
  },
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
