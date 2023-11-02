import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplateRecommends } from './getTemplateRecommends';
import { IStateSchema } from 'app/providers/store-provider';

describe('getTemplateRecommends', () => {
  test('Return user state templateRecommends prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templateRecommends: { ids: [] },
    };

    expect(getTemplateRecommends.selectAll(state as IStateSchema)).toEqual([]);
  });

  test('Return user state templateRecommends prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateRecommends.selectAll(state as IStateSchema)).toBe([]);
  });
});
