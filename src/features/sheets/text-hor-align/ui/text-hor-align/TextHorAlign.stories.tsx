import type { Meta, StoryObj } from '@storybook/react';
import { TextHorAlign } from './TextHorAlign';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/sheets/TextHorAlign',
  component: TextHorAlign,
} satisfies Meta<typeof TextHorAlign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
