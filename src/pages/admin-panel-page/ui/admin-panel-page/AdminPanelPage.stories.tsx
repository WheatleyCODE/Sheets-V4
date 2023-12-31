import type { Meta, StoryObj } from '@storybook/react';
import AdminPanelPage from './AdminPanelPage';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/AdminPanelPage',
  component: AdminPanelPage,
} satisfies Meta<typeof AdminPanelPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
