import { IStateSchema } from 'app/providers/store-provider';
import { IProfile } from '../../types/profile';
import { Country, Currency } from '../../types/profile';

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

export const getProfile = (state: IStateSchema) => state?.profile?.profile || initProfile;
