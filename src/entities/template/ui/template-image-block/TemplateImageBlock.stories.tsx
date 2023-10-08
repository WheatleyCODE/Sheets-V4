import type { Meta, StoryObj } from '@storybook/react';
import { TemplateImageBlock } from './TemplateImageBlock';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/TemplateImageBlock',
  component: TemplateImageBlock,
} satisfies Meta<typeof TemplateImageBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    block: {} as any,
  },
};

export const Dark: Story = {
  args: {
    block: {} as any,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
