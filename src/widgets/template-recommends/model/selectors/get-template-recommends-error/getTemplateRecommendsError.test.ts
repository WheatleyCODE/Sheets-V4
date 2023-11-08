import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplateRecommendsError } from './getTemplateRecommendsError';
import { IStateSchema } from 'app/providers/store-provider';

describe('getTemplateRecommendsError', () => {
  test('Return templateRecommends state error prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templateRecommends: { error: 'error' },
    };

    expect(getTemplateRecommendsError(state as IStateSchema)).toBe('error');
  });

  test('Return templateRecommends state error prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateRecommendsError(state as IStateSchema)).toBe(null);
  });
});
