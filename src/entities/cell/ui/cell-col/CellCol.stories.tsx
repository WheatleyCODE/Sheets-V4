import type { Meta, StoryObj } from '@storybook/react';
import { CellCol } from './CellCol';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/cell/CellCol',
  component: CellCol,
} satisfies Meta<typeof CellCol>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
