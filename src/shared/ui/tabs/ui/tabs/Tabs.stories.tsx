import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    initValue: null,
  },
};

export const Dark: Story = {
  args: {
    initValue: null,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
