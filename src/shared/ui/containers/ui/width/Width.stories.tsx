import type { Meta, StoryObj } from '@storybook/react';
import { Width } from './Width';

const meta = {
  title: 'shared/containers/Width',
  component: Width,
} satisfies Meta<typeof Width>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Templates: Story = {
  args: {
    maxWidth: 'template',
    children: <div style={{ width: '100vw', height: '50px', background: 'red' }} />,
  },
};

export const Sheets: Story = {
  args: {
    maxWidth: 'sheets',
    children: <div style={{ width: '100vw', height: '50px', background: 'red' }} />,
  },
};

export const Default: Story = {
  args: {
    maxWidth: 'default',
    children: <div style={{ width: '100vw', height: '50px', background: 'red' }} />,
  },
};
