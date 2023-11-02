import type { Meta, StoryObj } from '@storybook/react';
import { TemplatesPageInfinityTemplateList } from './TemplatesPageInfinityTemplateList';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/templates-page/TemplatesPageInfinityTemplateList',
  component: TemplatesPageInfinityTemplateList,
} satisfies Meta<typeof TemplatesPageInfinityTemplateList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
