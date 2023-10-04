import { DeepPartial } from 'shared/lib/ts-utils';
import { getProfileError } from './getProfileError';
import { IStateSchema } from 'app/providers/store-provider';

describe('getProfileError', () => {
  test('Return profile state error prop', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: { error: 'error' },
    };

    expect(getProfileError(state as IStateSchema)).toBe('error');
  });

  test('Return profile state error prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfileError(state as IStateSchema)).toBe(null);
  });
});
