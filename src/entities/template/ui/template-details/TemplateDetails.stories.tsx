import type { Meta, StoryObj } from '@storybook/react';
import { TemplateDetails } from './TemplateDetails';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/TemplateDetails',
  component: TemplateDetails,
} satisfies Meta<typeof TemplateDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    isLoading: false,
    error: null,
    template: {} as any,
  },
};

export const Dark: Story = {
  args: {
    isLoading: false,
    error: null,
    template: {} as any,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
