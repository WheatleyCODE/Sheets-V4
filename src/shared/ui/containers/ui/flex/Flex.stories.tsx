import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
  title: 'shared/containers/Flex',
  component: Flex,
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Row: Story = {
  args: {
    children: (
      <>
        <div>1,</div>
        <div>2,</div>
        <div>3,</div>
      </>
    ),
  },
};

export const RowGapX5: Story = {
  args: {
    gapMultiply: '5',
    children: (
      <>
        <div>1,</div>
        <div>2,</div>
        <div>3,</div>
      </>
    ),
  },
};

export const Col: Story = {
  args: {
    direction: 'col',
    children: (
      <>
        <div>1,</div>
        <div>2,</div>
        <div>3,</div>
      </>
    ),
  },
};

export const ColGapX5: Story = {
  args: {
    gapMultiply: '5',
    direction: 'col',
    children: (
      <>
        <div>1,</div>
        <div>2,</div>
        <div>3,</div>
      </>
    ),
  },
};
