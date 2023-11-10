import type { Meta, StoryObj } from '@storybook/react';
import { NotificationList } from './NotificationList';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers/lib';

const meta = {
  title: 'entities/NotificationList',
  component: NotificationList,
} satisfies Meta<typeof NotificationList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
