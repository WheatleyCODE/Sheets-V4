import type { Meta, StoryObj } from '@storybook/react';
import { SheetsFormula } from './SheetsFormula';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'widgets/sheets/SheetsFormula',
  component: SheetsFormula,
} satisfies Meta<typeof SheetsFormula>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
