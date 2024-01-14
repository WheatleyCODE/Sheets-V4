import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplateCommentsError } from './getTemplateCommentsError';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getTemplateCommentsError', () => {
  test('Return templateComments state error prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templateComments: { error: 'error' },
    };

    expect(getTemplateCommentsError(state as IStateSchema)).toBe('error');
  });

  test('Return templateComments state error prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateCommentsError(state as IStateSchema)).toBe(null);
  });
});
