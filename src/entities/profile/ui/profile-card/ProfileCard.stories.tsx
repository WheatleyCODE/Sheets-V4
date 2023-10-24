import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Theme } from 'app/providers/lib/theme-context';
import { themeDecorator } from '../../../../../config/storybook/theme-decorator/themeDecorator';
import { Country, Currency } from '../../model/types/profile';

const meta = {
  title: 'entities/profile/ProfileCard',
  component: ProfileCard,
} satisfies Meta<typeof ProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    profile: {
      userId: '1',
      firstname: 'Дмитрий',
      lastname: 'Бажаев',
      age: '22',
      currency: Currency.RUB,
      country: Country.RUSSIA,
      city: 'Moscow',
      username: 'admin',
      avatar:
        'https://sun1-19.userapi.com/s/v1/ig2/n_27Xqc6sKiVyUajtE6M6bzhFcAYhDyFCMs-ctp1Etd0FBCfEil7mx_amdWzMO9RGItTXynnwpoeyWayiSDeb9TM.jpg?size=400x400&quality=96&crop=0,0,900,900&ava=1',
    },
    isLoading: false,
    isReadonly: true,
    error: null,
  },
};

export const Dark: Story = {
  args: {
    profile: {
      userId: '1',
      firstname: 'Дмитрий',
      lastname: 'Бажаев',
      age: '22',
      currency: Currency.RUB,
      country: Country.RUSSIA,
      city: 'Moscow',
      username: 'admin',
      avatar:
        'https://sun1-19.userapi.com/s/v1/ig2/n_27Xqc6sKiVyUajtE6M6bzhFcAYhDyFCMs-ctp1Etd0FBCfEil7mx_amdWzMO9RGItTXynnwpoeyWayiSDeb9TM.jpg?size=400x400&quality=96&crop=0,0,900,900&ava=1',
    },
    isLoading: false,
    isReadonly: true,
    error: null,
  },
  decorators: [themeDecorator(Theme.DARK)],
};
