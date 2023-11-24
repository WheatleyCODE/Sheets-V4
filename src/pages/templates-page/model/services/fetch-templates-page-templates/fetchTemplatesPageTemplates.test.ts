import { TestAsyncThunk } from '@/shared/lib/tests';
import { fetchTemplatesPageTemplates } from './fetchTemplatesPageTemplates';

const templatesPage = {
  page: 2,
  ids: [],
  entities: {},
  limit: 5,
  isLoading: false,
  hasMore: false,
};

describe('fetchTemplatesPageNextTemplates', () => {
  test('Success', async () => {
    const thunk = new TestAsyncThunk(fetchTemplatesPageTemplates, {
      templatesPage,
    });

    thunk.api.get.mockReturnValue(Promise.resolve({ data: [] }));

    const res = await thunk.callThunk({ isReplace: false });

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(res.payload).toEqual([]);
  });

  test('Rejected', async () => {
    const thunk = new TestAsyncThunk(fetchTemplatesPageTemplates, {
      templatesPage,
    });

    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const res = await thunk.callThunk({ isReplace: false });

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toBe('Ошибка при загрузке шаблонов');
  });
});
