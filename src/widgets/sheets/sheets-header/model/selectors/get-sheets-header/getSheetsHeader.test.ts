import { getSheetsHeader } from './getSheetsHeader';
import { DeepPartial } from '@/shared/lib/ts-utils';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getSheetsHeader', () => {
  test('Return state sheetsHeader prop', () => {
    const state: DeepPartial<IStateSchema> = {
      sheetsHeader: { sheetsHeader: { name: 'name' } },
    };

    expect(getSheetsHeader(state as IStateSchema)).toEqual({ name: 'name' });
  });

  test('Return state sheetsHeader prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getSheetsHeader(state as IStateSchema)).toBe(undefined);
  });
});
