import type { Meta, StoryObj } from '@storybook/react';
import { EditableProfile } from './EditableProfile';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'widgets/editable-profile/EditableProfile',
  component: EditableProfile,
} satisfies Meta<typeof EditableProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};

export const Dark: Story = {
  args: {},
  decorators: [themeDecorator('dark')],
};
