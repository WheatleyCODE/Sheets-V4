import type { Meta, StoryObj } from '@storybook/react';
import { PageError } from './PageError';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers/lib/theme-context';

const meta = {
  title: 'widget/PageError',
  component: PageError,
} satisfies Meta<typeof PageError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
