import type { Meta, StoryObj } from '@storybook/react';
import { SheetsFooter } from './SheetsFooter';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'widgets/SheetsFooter',
  component: SheetsFooter,
} satisfies Meta<typeof SheetsFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
