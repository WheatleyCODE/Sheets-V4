import { Country, Currency, profileTests } from '../consts/profile.consts';
import { updateProfile } from '../services/update-profille/updateProfile';
import { IProfileSchema } from '../types/profile.interface';
import { profileActions, profileReducer } from './profileSlice';
import { DeepPartial } from 'shared/lib/ts-utils';

describe('profileSlice', () => {
  test('Test profile setProfile', () => {
    const state: DeepPartial<IProfileSchema> = {};

    expect(profileReducer(state as IProfileSchema, profileActions.setProfile(profileTests))).toEqual({
      profile: profileTests,
    });
  });

  test('Test profile updateProfile', () => {
    const state: DeepPartial<IProfileSchema> = {
      profile: {
        firstname: 'Петя',
        lastname: 'Васичкин',
        age: '34',
        currency: Currency.RUB,
        country: Country.BELARUS,
        city: 'Тула',
        username: 'Петя12345',
        avatar: 'http://...',
      },
    };

    expect(profileReducer(state as IProfileSchema, profileActions.updateProfile(profileTests))).toEqual({
      profile: profileTests,
    });
  });

  test('Test profile setIsReadonly', () => {
    const state: DeepPartial<IProfileSchema> = {
      isReadonly: true,
    };

    expect(profileReducer(state as IProfileSchema, profileActions.setIsReadonly(false))).toEqual({ isReadonly: false });
  });

  test('Test profile updateProfile pending', () => {
    const state: DeepPartial<IProfileSchema> = {
      isLoading: false,
      error: 'error',
    };

    expect(profileReducer(state as IProfileSchema, updateProfile.pending)).toEqual({ isLoading: true, error: null });
  });

  test('Test profile updateProfile rejected', () => {
    const state: DeepPartial<IProfileSchema> = {
      isLoading: true,
      error: 'error',
    };

    expect(profileReducer(state as IProfileSchema, updateProfile.rejected)).toEqual({ isLoading: false, error: null });
  });
});
