import type { Meta, StoryObj } from '@storybook/react';
import { SheetsHeader } from './SheetsHeader';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'widgets/sheets/SheetsHeader',
  component: SheetsHeader,
} satisfies Meta<typeof SheetsHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
