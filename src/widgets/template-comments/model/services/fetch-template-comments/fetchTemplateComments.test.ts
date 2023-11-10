import { IComment } from '@/entities/comment';
import { fetchTemplateComments } from './fetchTemplateComments';
import { TestAsyncThunk } from '@/shared/lib/tests';

describe('fetchTemplateComments', () => {
  test('Fulfilled', async () => {
    const templateComments: IComment[] = [{ id: '1', text: 'text', user: { id: '1', email: 'mail.ru' } }];

    const thunk = new TestAsyncThunk(fetchTemplateComments);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: templateComments }));

    const res = await thunk.callThunk({ id: '1' });

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(res.payload).toEqual(templateComments);
  });

  test('Rejected', async () => {
    const thunk = new TestAsyncThunk(fetchTemplateComments);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const res = await thunk.callThunk({ id: '1' });

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toBe('Ошибка при загрузке комментариев');
  });
});
