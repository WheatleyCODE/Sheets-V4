import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/Text',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    text: 'Текст',
  },
};

export const Dark: Story = {
  args: {
    text: 'Текст',
  },
  decorators: [themeDecorator('dark')],
};

export const Title: Story = {
  args: {
    title: 'Текст',
  },
};

export const Error: Story = {
  args: {
    title: 'Текст',
    textStyle: 'error',
  },
};

export const TitleBig: Story = {
  args: {
    title: 'Текст',
    textSize: 'big',
    titleTag: 'h1',
  },
};

export const TitleSmall: Story = {
  args: {
    title: 'Текст',
    textSize: 'small',
    titleTag: 'h6',
  },
};
