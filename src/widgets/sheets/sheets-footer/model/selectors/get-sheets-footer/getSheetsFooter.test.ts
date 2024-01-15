import { getSheetsFooter } from './getSheetsFooter';
import { DeepPartial } from '@/shared/lib/ts-utils';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getSheetsFooter', () => {
  test('Return state sheetsFooter prop', () => {
    const state: DeepPartial<IStateSchema> = {
      sheetsFooter: { sheetsFooter: { a: null } },
    };

    expect(getSheetsFooter(state as IStateSchema)).toEqual({ a: null });
  });

  test('Return state sheetsFooter prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getSheetsFooter(state as IStateSchema)).toBe(undefined);
  });
});
