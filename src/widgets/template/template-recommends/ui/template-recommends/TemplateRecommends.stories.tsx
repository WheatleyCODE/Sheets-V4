import type { Meta, StoryObj } from '@storybook/react';
import { TemplateRecommends } from './TemplateRecommends';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'widgets/template-recommends/TemplateRecommends',
  component: TemplateRecommends,
} satisfies Meta<typeof TemplateRecommends>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
