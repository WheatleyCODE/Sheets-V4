import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplateCommentsIsLoading } from './getTemplateCommentsIsLoading';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getTemplateCommentsIsLoading', () => {
  test('Return templateComments state isLoading prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templateComments: { isLoading: true },
    };

    expect(getTemplateCommentsIsLoading(state as IStateSchema)).toBe(true);
  });

  test('Return templateComments state isLoading prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateCommentsIsLoading(state as IStateSchema)).toBe(false);
  });
});
