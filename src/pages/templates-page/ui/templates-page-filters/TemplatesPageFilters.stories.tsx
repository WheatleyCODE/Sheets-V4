import type { Meta, StoryObj } from '@storybook/react';
import { TemplatesPageFilters } from './TemplatesPageFilters';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/template-page/TemplatesPageFilters',
  component: TemplatesPageFilters,
} satisfies Meta<typeof TemplatesPageFilters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {} as any,
};

export const Dark: Story = {
  args: {} as any,
  decorators: [themeDecorator('dark')],
};
