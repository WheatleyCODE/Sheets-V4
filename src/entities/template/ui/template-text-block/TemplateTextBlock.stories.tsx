import type { Meta, StoryObj } from '@storybook/react';
import { TemplateTextBlock } from './TemplateTextBlock';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';
import { TemplateBlockTypes } from 'entities/template/model/types/template';

const meta = {
  title: 'entities/TemplateTextBlock',
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
