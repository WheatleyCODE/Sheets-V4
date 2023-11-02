import { DeepPartial } from 'shared/lib/ts-utils';
import { getTemplateComments } from './getTemplateComments';
import { IStateSchema } from 'app/providers/store-provider';

describe('getTemplateComments', () => {
  test('Return user state templateComments prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templateComments: { ids: [] },
    };

    expect(getTemplateComments.selectAll(state as IStateSchema)).toEqual([]);
  });

  test('Return user state templateComments prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateComments.selectAll(state as IStateSchema)).toBe([]);
  });
});
