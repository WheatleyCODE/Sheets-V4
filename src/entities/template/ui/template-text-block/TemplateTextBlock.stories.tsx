import type { Meta, StoryObj } from '@storybook/react';
import { TemplateTextBlock } from './TemplateTextBlock';
import { Theme } from '@/app/providers/lib';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';
import { TemplateBlockTypes } from '../../model/consts/template.consts';

const meta = {
  title: 'entities/template/TemplateTextBlock',
  component: TemplateTextBlock,
} satisfies Meta<typeof TemplateTextBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    block: { paragraphs: ['Hello its me'], id: '1', type: TemplateBlockTypes.TEXT },
  },
};

export const Dark: Story = {
  args: {
    block: { paragraphs: ['Hello its me'], id: '1', type: TemplateBlockTypes.TEXT },
  },
  decorators: [themeDecorator(Theme.DARK)],
};
