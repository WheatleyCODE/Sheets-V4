import { getSheetsToolbar } from './getSheetsToolbar';
import { DeepPartial } from '@/shared/lib/ts-utils';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getSheetsToolbar', () => {
  test('Return state sheetsToolbar prop', () => {
    const state: DeepPartial<IStateSchema> = {
      sheetsToolbar: { sheetsToolbar: { textColor: 'red' } },
    };

    expect(getSheetsToolbar(state as IStateSchema)).toEqual({ textColor: 'red' });
  });

  test('Return state sheetsToolbar prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getSheetsToolbar(state as IStateSchema)).toBe(undefined);
  });
});
