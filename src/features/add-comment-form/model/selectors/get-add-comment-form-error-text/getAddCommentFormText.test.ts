import { DeepPartial } from 'shared/lib/ts-utils';
import { getAddCommentFormText } from './getAddCommentFormText';
import { IStateSchema } from 'app/providers/store-provider';

describe('getAddCommentFormText', () => {
  test('Return form state text prop', () => {
    const state: DeepPartial<IStateSchema> = {
      addCommentForm: { text: 'text' },
    };

    expect(getAddCommentFormText(state as IStateSchema)).toBe('text');
  });

  test('Return form state text prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getAddCommentFormText(state as IStateSchema)).toBe('');
  });
});
