import type { Meta, StoryObj } from '@storybook/react';
import { TemplateList } from './TemplateList';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/template/TemplateList',
  component: TemplateList,
} satisfies Meta<typeof TemplateList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    templates: [] as any,
  },
};

export const Dark: Story = {
  args: {
    templates: [] as any,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
