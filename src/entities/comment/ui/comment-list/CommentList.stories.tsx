import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from './CommentList';
import { Theme } from 'app/providers/lib';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/comment/CommentList',
  component: CommentList,
} satisfies Meta<typeof CommentList>;

export default meta;

type Story = StoryObj<typeof meta>;

const comments = [
  {
    id: '1',
    text: 'Comment',
    user: {
      id: 'id1',
      email: 'email',
      avatar: 'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
      username: 'Admin',
    },
  },
  {
    id: '2',
    text: 'Comment2',
    user: {
      id: 'id12',
      email: 'email',
      avatar: 'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
      username: 'Admin2',
    },
  },
];

export const Light: Story = {
  args: {
    comments,
  },
};

export const Dark: Story = {
  args: {
    comments,
  },
  decorators: [themeDecorator(Theme.DARK)],
};

export const Loading: Story = {
  args: {
    comments,
    isLoading: true,
  },
};
