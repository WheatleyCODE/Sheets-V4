import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenuItem } from './NavigationMenuItem';
import { Theme } from 'app/providers';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';
import { MdHome } from 'react-icons/md';

const meta = {
  title: 'features/NavigationMenuItem',
  component: NavigationMenuItem,
} satisfies Meta<typeof NavigationMenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    item: { Icon: MdHome, path: '', text: 'Домашняя страница' },
  },
};

export const Dark: Story = {
  args: {
    item: { Icon: MdHome, path: '', text: 'Домашняя страница' },
  },
  decorators: [themeDecorator(Theme.DARK)],
};
