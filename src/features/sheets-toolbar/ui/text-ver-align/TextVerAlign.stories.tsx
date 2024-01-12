import type { Meta, StoryObj } from '@storybook/react';
import { TextVerAlign } from './TextVerAlign';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'features/sheets-toolbar/TextVerAlign',
  component: TextVerAlign,
} satisfies Meta<typeof TextVerAlign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
