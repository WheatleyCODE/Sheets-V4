import type { Meta, StoryObj } from '@storybook/react';
import { TemplateListItem } from './TemplateListItem';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/TemplateListItem',
  component: TemplateListItem,
} satisfies Meta<typeof TemplateListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    template: {} as any,
    view: '{}' as any,
  },
};

export const Dark: Story = {
  args: {
    template: {} as any,
    view: '{}' as any,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
