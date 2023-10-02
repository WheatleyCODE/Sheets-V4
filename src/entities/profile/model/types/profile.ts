import { Country, Currency } from 'shared/consts/common/common';

export interface IProfile {
  firstname: string;
  lastname: string;
  age: number;
  currency: Currency;
  country: Country;
  city: string;
  username: string;
  avatar: string;
}

export interface IProfileSchema {
  profile?: IProfile;
  isLoading: boolean;
  error: string | null;
  readonly: boolean;
}
