import type { Meta, StoryObj } from '@storybook/react';
import { TemplateTextBlock } from './TemplateTextBlock';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/TemplateTextBlock',
  component: TemplateTextBlock,
} satisfies Meta<typeof TemplateTextBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
