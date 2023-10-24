import type { Meta, StoryObj } from '@storybook/react';
import TemplateDetailsPage from './TemplateDetailsPage';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/template-details-page/TemplateDetailsPage',
  component: TemplateDetailsPage,
} satisfies Meta<typeof TemplateDetailsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
