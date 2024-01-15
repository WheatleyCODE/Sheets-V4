import { getSheetsFormula } from './getSheetsFormula';
import { DeepPartial } from '@/shared/lib/ts-utils';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getSheetsFormula', () => {
  test('Return state sheetsFormula prop', () => {
    const state: DeepPartial<IStateSchema> = {
      sheetsFormula: { sheetsFormula: { formula: 'x5' } },
    };

    expect(getSheetsFormula(state as IStateSchema)).toEqual({ formula: 'x5' });
  });

  test('Return state sheetsFormula prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getSheetsFormula(state as IStateSchema)).toBe(undefined);
  });
});
