import type { Meta, StoryObj } from '@storybook/react';
import { RWidth } from './RWidth';

const meta = {
  title: 'shared/containers/RWidth',
  component: RWidth,
} satisfies Meta<typeof RWidth>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Template: Story = {
  args: {
    maxWidth: 'template',
    children: <div style={{ width: '100vw', height: '50px', background: '#cc5a2d' }} />,
  },
};

export const Sheets: Story = {
  args: {
    maxWidth: 'sheets',
    children: <div style={{ width: '100vw', height: '50px', background: '#cc5a2d' }} />,
  },
};

export const Default: Story = {
  args: {
    maxWidth: 'default',
    children: <div style={{ width: '100vw', height: '50px', background: '#cc5a2d' }} />,
  },
};
