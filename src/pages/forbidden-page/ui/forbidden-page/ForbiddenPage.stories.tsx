import type { Meta, StoryObj } from '@storybook/react';
import ForbiddenPage from './ForbiddenPage';
import { Theme } from '@/app/providers/lib';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
} satisfies Meta<typeof ForbiddenPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
