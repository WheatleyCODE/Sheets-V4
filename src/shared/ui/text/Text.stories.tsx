import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { Theme } from 'app/providers';
import { themeDecorator } from '../../../../config/storybook/theme-decorator/themeDecorator';
import { TextStyle } from './interface';

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
  decorators: [themeDecorator(Theme.DARK)],
};

export const Title: Story = {
  args: {
    title: 'Текст',
  },
};

export const Error: Story = {
  args: {
    title: 'Текст',
    textStyle: TextStyle.ERROR,
  },
};
