import type { Meta, StoryObj } from '@storybook/react';
import { Star } from './Star';
import { themeDecorator } from 'config/storybook/theme-decorator/themeDecorator';
import { MdOutlineStarHalf } from 'react-icons/md';

const meta = {
  title: 'shared/Star',
  component: Star,
} satisfies Meta<typeof Star>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    count: 5,
    StarIcon: MdOutlineStarHalf,
    getChangeCurrent: () => () => {},
    selectStar: () => {},
    isSelect: false,
  },
};

export const Dark: Story = {
  args: {
    count: 5,
    StarIcon: MdOutlineStarHalf,
    getChangeCurrent: () => () => {},
    selectStar: () => {},
    isSelect: false,
  },
  decorators: [themeDecorator('dark')],
};
