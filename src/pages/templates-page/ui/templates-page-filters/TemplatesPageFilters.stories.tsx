import type { Meta, StoryObj } from '@storybook/react';
import { TemplatesPageFilters } from './TemplatesPageFilters';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/TemplatesPageFilters',
  component: TemplatesPageFilters,
} satisfies Meta<typeof TemplatesPageFilters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {} as any,
};

export const Dark: Story = {
  args: {} as any,
  decorators: [themeDecorator(Theme.DARK)],
};
