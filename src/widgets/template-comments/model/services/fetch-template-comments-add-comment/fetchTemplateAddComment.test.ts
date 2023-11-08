import { IComment } from 'entities/comment';
import { fetchTemplateAddComment } from './fetchTemplateAddComment';
import { TestAsyncThunk } from 'shared/lib/tests';

describe('fetchTemplateAddComment', () => {
  // ! FIX TEST
  // test('Fulfilled', async () => {
  //   const templateComment: IComment = { id: '1', text: 'hello', user: { id: '1', email: 'mail.ru' } };

  //   const thunk = new TestAsyncThunk(fetchTemplateAddComment);
  //   thunk.api.get.mockReturnValue(Promise.resolve({ data: templateComment }));

  //   const res = await thunk.callThunk({ templateId: '1', text: 'hello', userId: '1' });

  //   expect(thunk.api.post).toHaveBeenCalled();
  //   expect(thunk.dispatch).toHaveBeenCalledTimes(2);
  //   expect(res.meta.requestStatus).toBe('fulfilled');
  //   expect(res.payload).toEqual(templateComment);
  // });

  test('Rejected', async () => {
    const thunk = new TestAsyncThunk(fetchTemplateAddComment);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const res = await thunk.callThunk({ templateId: '1', text: 'hello', userId: '1' });

    expect(thunk.api.post).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toBe('Ошибка при отправке комментария');
  });
});
