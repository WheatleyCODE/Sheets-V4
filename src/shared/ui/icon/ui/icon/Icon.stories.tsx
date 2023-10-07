import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';
import { MdHome } from 'react-icons/md';

const meta = {
  title: 'shared/Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    Icon: MdHome,
  },
};

export const Dark: Story = {
  args: {
    Icon: MdHome,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
