import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { RoutesPath } from '@/shared/config/route-config/routeConfig';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

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
  decorators: [themeDecorator('dark')],
};
