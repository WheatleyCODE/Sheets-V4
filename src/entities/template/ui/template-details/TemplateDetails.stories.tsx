import type { Meta, StoryObj } from '@storybook/react';
import { TemplateDetails } from './TemplateDetails';
import { Theme } from 'app/providers/lib';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';
import { ITemplate } from '../../model/types/template.interface';
import { TemplateTags } from '../../model/consts/template.consts';

const template: ITemplate = {
  id: '1',
  createdAt: '26.06.2001',
  image: 'https://www.unisender.com/ru/blog/wp-content/uploads/2022/09/8-2.png',
  title: 'Шаблон',
  subtitle: 'Новый',
  tags: [TemplateTags.IT],
  blocks: [],
  template: {},
  views: 12345,
};

const meta = {
  title: 'entities/template/TemplateDetails',
  component: TemplateDetails,
} satisfies Meta<typeof TemplateDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    isLoading: false,
    error: null,
    template,
  },
};

export const Dark: Story = {
  args: {
    isLoading: false,
    error: null,
    template,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
