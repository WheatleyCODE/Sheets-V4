import type { Meta, StoryObj } from '@storybook/react';
import { SheetsTable } from './SheetsTable';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'widgets/SheetsTable',
  component: SheetsTable,
} satisfies Meta<typeof SheetsTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
