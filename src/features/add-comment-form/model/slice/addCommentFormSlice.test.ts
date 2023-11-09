import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice';
import { IAddCommentFormSchema } from '../types/addCommentForm.interface';
import { DeepPartial } from 'shared/lib/ts-utils';

describe('addCommentFormSlice', () => {
  test('Test addCommentForm setText', () => {
    const state: DeepPartial<IAddCommentFormSchema> = {
      text: '',
    };

    expect(addCommentFormReducer(state as IAddCommentFormSchema, addCommentFormActions.setText('ya@mail.ru'))).toEqual({
      text: 'ya@mail.ru',
    });
  });
});
