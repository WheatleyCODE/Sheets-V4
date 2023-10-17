import type { Meta, StoryObj } from '@storybook/react';
import TemplateEditPage from './TemplateEditPage';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/TemplateEditPage',
  component: TemplateEditPage,
} satisfies Meta<typeof TemplateEditPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
