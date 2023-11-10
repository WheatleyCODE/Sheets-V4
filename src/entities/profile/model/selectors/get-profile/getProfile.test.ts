import { DeepPartial } from '@/shared/lib/ts-utils';
import { getProfile } from './getProfile';
import { IStateSchema } from '@/app/providers/store-provider';
import { profileTests, initProfile } from '../../consts/profile.consts';

describe('getProfile', () => {
  test('Return profile state', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: { profile: profileTests },
    };

    expect(getProfile(state as IStateSchema)).toEqual(profileTests);
  });

  test('Return profile state, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfile(state as IStateSchema)).toEqual(initProfile);
  });
});
