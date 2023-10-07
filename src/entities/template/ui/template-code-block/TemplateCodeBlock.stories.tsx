import type { Meta, StoryObj } from '@storybook/react';
import { TemplateCodeBlock } from './TemplateCodeBlock';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/TemplateCodeBlock',
  component: TemplateCodeBlock,
} satisfies Meta<typeof TemplateCodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
