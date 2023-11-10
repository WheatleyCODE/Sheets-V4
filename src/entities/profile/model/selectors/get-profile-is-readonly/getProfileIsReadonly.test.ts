import { DeepPartial } from '@/shared/lib/ts-utils';
import { getProfileIsReadonly } from './getProfileIsReadonly';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getProfileIsReadonly', () => {
  test('Return profile state isReadonly prop', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: { isReadonly: true },
    };

    expect(getProfileIsReadonly(state as IStateSchema)).toBe(true);
  });

  test('Return profile state isReadonly prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getProfileIsReadonly(state as IStateSchema)).toBe(false);
  });
});
