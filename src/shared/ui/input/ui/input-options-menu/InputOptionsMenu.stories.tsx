import type { Meta, StoryObj } from '@storybook/react';
import { InputOptionsMenu } from './InputOptionsMenu';
import { Theme } from '@/app/providers/lib';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';
import { InputOptionsMenuItem } from '../input-options-menu-item/InputOptionsMenuItem';

const meta = {
  title: 'shared/input/InputOptionsMenu',
  component: InputOptionsMenu,
} satisfies Meta<typeof InputOptionsMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: <h1>InputOptionsMenu</h1>,
  },
};

export const Dark: Story = {
  args: {
    children: <h1>InputOptionsMenu</h1>,
  },
  decorators: [themeDecorator(Theme.DARK)],
};

export const Full: Story = {
  args: {
    maxItems: 7,
    children: (
      <>
        <InputOptionsMenuItem item={{ text: 'item1' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item2' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item3' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item4' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item5' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item6' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item7' }} onClick={() => {}} />
      </>
    ),
  },
};

export const FullMaxFore: Story = {
  args: {
    maxItems: 4,
    children: (
      <>
        <InputOptionsMenuItem item={{ text: 'item1' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item2' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item3' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item4' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item5' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item6' }} onClick={() => {}} />
        <InputOptionsMenuItem item={{ text: 'item7' }} onClick={() => {}} />
      </>
    ),
  },
};
