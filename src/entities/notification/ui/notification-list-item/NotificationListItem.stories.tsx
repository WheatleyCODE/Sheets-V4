import type { Meta, StoryObj } from '@storybook/react';
import { NotificationListItem } from './NotificationListItem';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/NotificationListItem',
  component: NotificationListItem,
} satisfies Meta<typeof NotificationListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    notification: { id: '1', title: 'title', description: 'description' },
  },
};

export const Dark: Story = {
  args: {
    notification: { id: '1', title: 'title', description: 'description' },
  },
  decorators: [themeDecorator('dark')],
};
