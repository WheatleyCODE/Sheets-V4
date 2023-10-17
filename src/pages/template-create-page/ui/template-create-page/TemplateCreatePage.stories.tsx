import type { Meta, StoryObj } from '@storybook/react';
import TemplateCreatePage from './TemplateCreatePage';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/TemplateCreatePage',
  component: TemplateCreatePage,
} satisfies Meta<typeof TemplateCreatePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
