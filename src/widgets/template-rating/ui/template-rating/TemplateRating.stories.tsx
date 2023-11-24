import type { Meta, StoryObj } from '@storybook/react';
import TemplateRating from './TemplateRating';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'widgets/TemplateRating',
  component: TemplateRating,
} satisfies Meta<typeof TemplateRating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
