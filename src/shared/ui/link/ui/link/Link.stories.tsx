import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { getRouteHome } from '@/shared/config/route-config/routeConfig';
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
    to: getRouteHome(),
  },
};

export const Dark: Story = {
  args: {
    children: 'Link',
    to: getRouteHome(),
  },
  decorators: [themeDecorator('dark')],
};
