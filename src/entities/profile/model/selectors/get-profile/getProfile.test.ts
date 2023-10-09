import { DeepPartial } from 'shared/lib/ts-utils';
import { getProfile, initProfile } from './getProfile';
import { IStateSchema } from 'app/providers/store-provider';
import { Country, Currency, IProfile } from '../../types/profile';

describe('getProfile', () => {
  test('Return profile state', () => {
    const profile: IProfile = {
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

    const state: DeepPartial<IStateSchema> = {
      profile: { profile },
    };

    expect(getProfile(state as IStateSchema)).toEqual(profile);
  });

  test('Return profile state, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfile(state as IStateSchema)).toEqual(initProfile);
  });
});
