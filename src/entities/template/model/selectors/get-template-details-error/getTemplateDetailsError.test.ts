import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplateDetailsError } from './getTemplateDetailsError';
import { IStateSchema } from 'app/providers/store-provider';

describe('getTemplateError', () => {
  test('Return template state error prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templateDetails: { error: 'error' },
    };

    expect(getTemplateDetailsError(state as IStateSchema)).toBe('error');
  });

  test('Return template state error prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateDetailsError(state as IStateSchema)).toBe(null);
  });
});
