import type { Meta, StoryObj } from '@storybook/react';
import { TemplateDetailsPageHeader } from './TemplateDetailsPageHeader';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'changeTitle/TemplateDetailsPageHeader',
  component: TemplateDetailsPageHeader,
} satisfies Meta<typeof TemplateDetailsPageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
