import { DeepPartial } from 'shared/lib/ts-utils';
import { getAddCommentFormError } from './getAddCommentFormError';
import { IStateSchema } from 'app/providers/store-provider';

describe('getAddCommentFormError', () => {
  test('Return form state error prop', () => {
    const state: DeepPartial<IStateSchema> = {
      addCommentForm: { error: 'error' },
    };

    expect(getAddCommentFormError(state as IStateSchema)).toBe('error');
  });

  test('Return form state error prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getAddCommentFormError(state as IStateSchema)).toBe(null);
  });
});
