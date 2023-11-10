import type { Meta, StoryObj } from '@storybook/react';
import { PageLoader } from './PageLoader';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from '@/app/providers/lib';

const meta = {
  title: 'widgets/PageLoader',
  component: PageLoader,
} satisfies Meta<typeof PageLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
