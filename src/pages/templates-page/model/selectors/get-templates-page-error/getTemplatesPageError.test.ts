import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplatesPageError } from './getTemplatesPageError';
import { IStateSchema } from 'app/providers/store-provider';

describe('getTemplatesPageError', () => {
  test('Return template page state error prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { error: 'error' },
    };

    expect(getTemplatesPageError(state as IStateSchema)).toBe('error');
  });

  test('Return template page state error prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageError(state as IStateSchema)).toBe(null);
  });
});
