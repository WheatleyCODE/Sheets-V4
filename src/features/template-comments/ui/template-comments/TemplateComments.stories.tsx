import type { Meta, StoryObj } from '@storybook/react';
import { TemplateComments } from './TemplateComments';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'changeTitle/TemplateComments',
  component: TemplateComments,
} satisfies Meta<typeof TemplateComments>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
