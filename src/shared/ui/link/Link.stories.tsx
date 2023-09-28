import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { Theme } from 'app/providers';
import { RoutesPath } from 'shared/config/route-config/routeConfig';

const meta = {
  title: 'shared/Link',
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: 'Link',
    to: RoutesPath.home,
  },
};

export const Dark: Story = {
  args: {
    children: 'Link',
    to: RoutesPath.home,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
