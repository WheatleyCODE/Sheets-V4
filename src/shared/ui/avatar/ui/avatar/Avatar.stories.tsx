import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { Theme } from 'app/providers/lib';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    src: 'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
  },
};

export const Dark: Story = {
  args: {
    src: 'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
  },
  decorators: [themeDecorator(Theme.DARK)],
};
