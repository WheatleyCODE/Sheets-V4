import type { Meta, StoryObj } from '@storybook/react';
import { TemplateDetailsPageHeader } from './TemplateDetailsPageHeader';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/template-details-page/TemplateDetailsPageHeader',
  component: TemplateDetailsPageHeader,
} satisfies Meta<typeof TemplateDetailsPageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
