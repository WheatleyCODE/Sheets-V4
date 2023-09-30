import type { Meta, StoryObj } from '@storybook/react';
import LandingPage from './LandingPage';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';

const meta = {
  title: 'pages/LandingPage',
  component: LandingPage,
} satisfies Meta<typeof LandingPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};