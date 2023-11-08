import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplateRecommendsIsLoading } from './getTemplateRecommendsIsLoading';
import { IStateSchema } from 'app/providers/store-provider';

describe('getTemplateRecommendsIsLoading', () => {
  test('Return templateRecommends state isLoading prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templateRecommends: { isLoading: true },
    };

    expect(getTemplateRecommendsIsLoading(state as IStateSchema)).toBe(true);
  });

  test('Return templateRecommends state isLoading prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateRecommendsIsLoading(state as IStateSchema)).toBe(false);
  });
});
