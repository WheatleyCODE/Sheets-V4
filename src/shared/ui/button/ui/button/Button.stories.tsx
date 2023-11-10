import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Theme } from '@/app/providers/lib';
import { ButtonSize } from './Button.consts';
import { MdVerifiedUser } from 'react-icons/md';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    text: 'Кнопка',
  },
};

export const Dark: Story = {
  args: {
    text: 'Кнопка',
  },
  decorators: [themeDecorator(Theme.DARK)],
};

export const Big: Story = {
  args: {
    text: 'Кнопка',
    buttonSize: ButtonSize.BIG,
  },
};

export const Normal: Story = {
  args: {
    text: 'Кнопка',
    buttonSize: ButtonSize.NORMAL,
  },
};

export const Small: Story = {
  args: {
    text: 'Кнопка',
    buttonSize: ButtonSize.SMALL,
  },
};

export const IconText: Story = {
  args: {
    text: 'Пользователь',
    Icon: MdVerifiedUser,
    buttonSize: ButtonSize.NORMAL,
  },
};

export const Icon: Story = {
  args: {
    Icon: MdVerifiedUser,
    buttonSize: ButtonSize.NORMAL,
  },
};

export const BigSquare: Story = {
  args: {
    text: 'ICO',
    square: true,
    buttonSize: ButtonSize.BIG,
  },
};

export const NormalSquare: Story = {
  args: {
    text: 'ICO',
    square: true,
    buttonSize: ButtonSize.NORMAL,
  },
};

export const Small_Square: Story = {
  args: {
    text: 'ICO',
    square: true,
    buttonSize: ButtonSize.SMALL,
  },
};
