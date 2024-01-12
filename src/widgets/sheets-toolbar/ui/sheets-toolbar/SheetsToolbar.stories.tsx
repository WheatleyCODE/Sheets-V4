import type { Meta, StoryObj } from '@storybook/react';
import { SheetsToolbar } from './SheetsToolbar';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'widgets/SheetsToolbar',
  component: SheetsToolbar,
} satisfies Meta<typeof SheetsToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
