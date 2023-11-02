import type { Meta, StoryObj } from '@storybook/react';
import { TemplateDetailsPageMain } from './TemplateDetailsPageMain';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/template-details-page/TemplateDetailsPageMain',
  component: TemplateDetailsPageMain,
} satisfies Meta<typeof TemplateDetailsPageMain>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
