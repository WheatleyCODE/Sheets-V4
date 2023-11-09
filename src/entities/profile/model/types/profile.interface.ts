import { Country, Currency } from '../consts/profile.consts';

export interface IProfile {
  id?: string;
  userId?: string;
  firstname?: string;
  lastname?: string;
  age?: string;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface IProfileSchema extends IReduxSchema {
  profile?: IProfile;
  isReadonly: boolean;
}
