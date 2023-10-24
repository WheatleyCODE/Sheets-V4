import type { Meta, StoryObj } from '@storybook/react';
import { TemplateImageBlock } from './TemplateImageBlock';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';
import { TemplateBlockTypes } from '../../model/types/template';

const meta = {
  title: 'entities/template/TemplateImageBlock',
  component: TemplateImageBlock,
} satisfies Meta<typeof TemplateImageBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    block: {
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      id: '1',
      title: 'Title',
      type: TemplateBlockTypes.IMAGE,
    },
  },
};

export const Dark: Story = {
  args: {
    block: {
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      id: '1',
      title: 'Title',
      type: TemplateBlockTypes.IMAGE,
    },
  },
  decorators: [themeDecorator(Theme.DARK)],
};
