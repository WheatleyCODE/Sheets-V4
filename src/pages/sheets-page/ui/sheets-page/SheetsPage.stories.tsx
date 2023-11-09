import type { Meta, StoryObj } from '@storybook/react';
import SheetsPage from './SheetsPage';
import { Theme } from 'app/providers/lib';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'pages/SheetsPage',
  component: SheetsPage,
} satisfies Meta<typeof SheetsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
