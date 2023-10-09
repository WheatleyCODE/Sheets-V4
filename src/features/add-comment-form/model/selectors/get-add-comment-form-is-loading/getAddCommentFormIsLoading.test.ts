import { DeepPartial } from 'shared/lib/ts-utils';
import { getAddCommentFormIsLoading } from './getAddCommentFormIsLoading';
import { IStateSchema } from 'app/providers/store-provider';

describe('getAddCommentFormIsLoading', () => {
  test('Return form state isLoading prop', () => {
    const state: DeepPartial<IStateSchema> = {
      addCommentForm: { isLoading: true },
    };

    expect(getAddCommentFormIsLoading(state as IStateSchema)).toBe(true);
  });

  test('Return form state isLoading prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getAddCommentFormIsLoading(state as IStateSchema)).toBe(false);
  });
});
