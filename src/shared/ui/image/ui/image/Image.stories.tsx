import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';
import { Theme } from 'app/providers/lib';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/image/Image',
  component: Image,
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    src: 'https://www.unisender.com/ru/blog/wp-content/uploads/2022/09/8-2.png',
  },
};

export const Dark: Story = {
  args: {
    src: 'https://www.unisender.com/ru/blog/wp-content/uploads/2022/09/8-2.png',
  },
  decorators: [themeDecorator(Theme.DARK)],
};

export const Error: Story = {
  args: {
    src: 'https://foo.imgs',
  },
};

export const ErrorCustom: Story = {
  args: {
    src: 'https://foo.imgs',
    fallback: <h1>Loading...</h1>,
    errorFallback: <h1>Error</h1>,
  },
};
