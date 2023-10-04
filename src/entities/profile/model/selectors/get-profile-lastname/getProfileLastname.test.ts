import { DeepPartial } from 'shared/lib/ts-utils';
import { getProfileLastname } from './getProfileLastname';
import { IStateSchema } from 'app/providers/store-provider';

describe('getProfileLastname', () => {
  test('Return profile state lastname prop', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: { profile: { lastname: 'Вася' } },
    };

    expect(getProfileLastname(state as IStateSchema)).toBe('Вася');
  });

  test('Return profile state lastname prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfileLastname(state as IStateSchema)).toBe('');
  });
});
