import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplateCommentsSelectAll } from './getTemplateComments';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getTemplateCommentsSelectAll', () => {
  test('Return user state templateComments prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templateComments: { ids: [] },
    };

    expect(getTemplateCommentsSelectAll(state as IStateSchema)).toStrictEqual([]);
  });

  test('Return user state templateComments prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateCommentsSelectAll(state as IStateSchema)).toStrictEqual([]);
  });
});
