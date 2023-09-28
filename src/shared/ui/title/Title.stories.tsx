import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';

const meta = {
  title: 'shared/Title',
  component: Title,
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    text: 'Title',
    children: 'Title',
  },
};

export const Dark: Story = {
  args: {
    text: 'Title',
    children: 'Title',
  },
  decorators: [themeDecorator(Theme.DARK)],
};
