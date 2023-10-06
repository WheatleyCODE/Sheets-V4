import type { Meta, StoryObj } from '@storybook/react';
import { {{pascalCase}} } from './{{pascalCase}}';
import { Theme } from 'app/providers/lib/theme-context';

themeDecora

const meta = {
  title: 'changeTitle/{{pascalCase}}',
  component: {{pascalCase}},
} satisfies Meta<typeof {{pascalCase}}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator(Theme.DARK)],
};
