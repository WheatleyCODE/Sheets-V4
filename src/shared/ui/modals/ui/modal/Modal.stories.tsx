import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { themeDecorator } from '../../../../../../config/storybook/theme-decorator/themeDecorator';

const meta = {
  title: 'shared/modals/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    children: <h1>Модалка</h1>,
    onClose: () => {},
  },
};

export const Dark: Story = {
  args: {
    children: <h1>Модалка</h1>,
    onClose: () => {},
  },
  decorators: [themeDecorator('dark')],
};
