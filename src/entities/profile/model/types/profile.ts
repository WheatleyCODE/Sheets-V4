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

export interface IProfileSchema {
  profile?: IProfile;
  isLoading: boolean;
  error: string | null;
  isReadonly: boolean;
}

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
