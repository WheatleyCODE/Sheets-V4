import type { Meta, StoryObj } from '@storybook/react';
import { TemplateRecommends } from './TemplateRecommends';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'changeTitle/TemplateRecommends',
  component: TemplateRecommends,
} satisfies Meta<typeof TemplateRecommends>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
