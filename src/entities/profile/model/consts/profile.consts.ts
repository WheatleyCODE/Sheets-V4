import type { IProfile, IProfileSchema } from '../types/profile.interface';

export enum Currency {
  NONE = '',
  RUB = 'RUB',
  EUR = 'EUR',
  USD = 'USD',
}

export enum Country {
  NONE = '',
  RUSSIA = 'Россия',
  UKRAINE = 'Украина',
  BELARUS = 'Беларусь',
  GERMANY = 'Германия',
  FRANCE = 'Франция',
}

export enum ProfileCardTextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export const initialProfileState: IProfileSchema = {
  error: null,
  isLoading: false,
  isReadonly: true,
};

export const initProfile: IProfile = {
  userId: '',
  firstname: '',
  lastname: '',
  age: '0',
  currency: Currency.RUB,
  country: Country.RUSSIA,
  city: '',
  username: '',
  avatar: '',
};

export const profileTests: IProfile = {
  userId: '1',
  firstname: 'Вася',
  lastname: 'Пупкин',
  age: '65',
  currency: Currency.USD,
  country: Country.RUSSIA,
  city: 'Благовещенск',
  username: 'Vasya28RUS',
  avatar: 'http://...',
};
