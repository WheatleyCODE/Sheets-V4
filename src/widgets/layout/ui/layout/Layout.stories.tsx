import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'widgets/Layout',
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: <h1>Лэйаут</h1>,
  },
};

export const Dark: Story = {
  args: {
    children: <h1>Лэйаут</h1>,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
