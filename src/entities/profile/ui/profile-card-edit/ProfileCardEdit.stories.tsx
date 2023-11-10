import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCardEdit } from './ProfileCardEdit';
import { Theme } from '@/app/providers/lib';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'entities/profile/ProfileCardEdit',
  component: ProfileCardEdit,
} satisfies Meta<typeof ProfileCardEdit>;

export default meta;

type Story = StoryObj<typeof meta>;

const noop: (a?: any) => void = () => {};
const validHooks: any = {};

export const Light: Story = {
  args: {
    isReadonly: true,
    enableProfileChange: noop,
    disableProfileChange: noop,
    saveProfileChange: noop,
    validHooks,
  },
};

export const Dark: Story = {
  args: {
    isReadonly: true,
    enableProfileChange: noop,
    disableProfileChange: noop,
    saveProfileChange: noop,
    validHooks,
  },
  decorators: [themeDecorator(Theme.DARK)],
};

export const Open: Story = {
  args: {
    isReadonly: false,
    enableProfileChange: noop,
    disableProfileChange: noop,
    saveProfileChange: noop,
    validHooks,
  },
};
