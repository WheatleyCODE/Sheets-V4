import type { Meta, StoryObj } from '@storybook/react';
import { NotificationButton } from './NotificationButton';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/NotificationButton',
  component: NotificationButton,
} satisfies Meta<typeof NotificationButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
