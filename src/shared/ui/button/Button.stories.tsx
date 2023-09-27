import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';

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
