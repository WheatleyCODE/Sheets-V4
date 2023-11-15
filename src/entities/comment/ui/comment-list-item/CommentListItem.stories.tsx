import type { Meta, StoryObj } from '@storybook/react';
import { CommentListItem } from './CommentListItem';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/comment/CommentListItem',
  component: CommentListItem,
} satisfies Meta<typeof CommentListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const comment = {
  id: '1',
  text: 'Comment',
  user: {
    id: 'id1',
    email: 'email',
    avatar: 'https://cdn1.tenchat.ru/static/vbc-gostinder/user-picture/cdc8face-2608-4f07-90c3-68776d03c246.jpeg',
    username: 'Admin',
  },
};

export const Light: Story = {
  args: {
    comment,
  },
};

export const Dark: Story = {
  args: {
    comment,
  },
  decorators: [themeDecorator('dark')],
};
