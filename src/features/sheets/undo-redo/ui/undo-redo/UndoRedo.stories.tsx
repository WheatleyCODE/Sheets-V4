import type { Meta, StoryObj } from '@storybook/react';
import { UndoRedo } from './UndoRedo';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/sheets/UndoRedo',
  component: UndoRedo,
} satisfies Meta<typeof UndoRedo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
