import { DeepPartial } from '@/shared/lib/ts-utils';
import { getProfileFirstname } from './getProfileFirstname';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getProfileFirstname', () => {
  test('Return profile state firstname prop', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: { profile: { firstname: 'Петя' } },
    };

    expect(getProfileFirstname(state as IStateSchema)).toBe('Петя');
  });

  test('Return profile state firstname prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfileFirstname(state as IStateSchema)).toBe('');
  });
});
