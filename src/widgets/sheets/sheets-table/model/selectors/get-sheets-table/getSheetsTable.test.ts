import { getSheetsTable } from './getSheetsTable';
import { DeepPartial } from '@/shared/lib/ts-utils';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getSheetsTable', () => {
  test('Return state sheetsTable prop', () => {
    const state: DeepPartial<IStateSchema> = {
      sheetsTable: { sheetsTable: { cells: [], cols: [], id: '1' } },
    };

    expect(getSheetsTable(state as IStateSchema)).toEqual({ a: null });
  });

  test('Return state sheetsTable prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getSheetsTable(state as IStateSchema)).toBe(undefined);
  });
});
