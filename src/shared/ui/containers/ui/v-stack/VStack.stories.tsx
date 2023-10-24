import type { Meta, StoryObj } from '@storybook/react';
import { VStack } from './VStack';

const meta = {
  title: 'shared/containers/VStack',
  component: VStack,
} satisfies Meta<typeof VStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GapX2: Story = {
  args: {
    gapMultiply: '2',
    children: (
      <>
        <div>1,</div>
        <div>2,</div>
        <div>3,</div>
      </>
    ),
  },
};

export const GapX4: Story = {
  args: {
    gapMultiply: '4',
    children: (
      <>
        <div>1,</div>
        <div>2,</div>
        <div>3,</div>
      </>
    ),
  },
};
