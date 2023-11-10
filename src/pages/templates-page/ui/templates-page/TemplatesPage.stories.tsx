import type { Meta, StoryObj } from '@storybook/react';
import TemplatesPage from './TemplatesPage';
import { Theme } from '@/app/providers/lib';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/template-page/TemplatesPage',
  component: TemplatesPage,
} satisfies Meta<typeof TemplatesPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
