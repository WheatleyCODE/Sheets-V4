import type { Meta, StoryObj } from '@storybook/react';
import { TemplatesViewSwitcher } from './TemplatesViewSwitcher';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/TemplatesViewSwitcher',
  component: TemplatesViewSwitcher,
} satisfies Meta<typeof TemplatesViewSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    view: '' as any,
  },
};

export const Dark: Story = {
  args: {
    view: '' as any,
  },
  decorators: [themeDecorator('dark')],
};
