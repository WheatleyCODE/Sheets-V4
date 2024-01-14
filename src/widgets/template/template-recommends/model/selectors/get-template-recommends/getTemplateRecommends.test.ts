import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplateRecommendsSelectAll } from './getTemplateRecommends';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getTemplateRecommendsSelectAll', () => {
  test('Return user state templateRecommends prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templateRecommends: { ids: [] },
    };

    expect(getTemplateRecommendsSelectAll(state as IStateSchema)).toEqual([]);
  });

  test('Return user state templateRecommends prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateRecommendsSelectAll(state as IStateSchema)).toEqual([]);
  });
});
