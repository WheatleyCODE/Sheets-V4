import { fetchTemplateRecommends } from './fetchTemplateRecommends';
import { TestAsyncThunk } from 'shared/lib/tests';

describe('fetchTemplateRecommends', () => {
  // ! FIX
  // test('Fulfilled', async () => {
  //   const templateRecommends: ITemplateRecommends = {
  //     a: null,
  //   };

  //   const thunk = new TestAsyncThunk(fetchTemplateRecommends);
  //   thunk.api.get.mockReturnValue(Promise.resolve({ data: templateRecommends }));
  //   const res = await thunk.callThunk();
  //   expect(thunk.api.get).toHaveBeenCalled();
  //   expect(thunk.dispatch).toHaveBeenCalledTimes(2);
  //   expect(res.meta.requestStatus).toBe('fulfilled');
  //   expect(res.payload).toEqual(templateRecommends);
  // });

  test('Rejected', async () => {
    const thunk = new TestAsyncThunk(fetchTemplateRecommends);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const res = await thunk.callThunk();
    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toBe('Ошибка при загрузке рекомендуемых');
  });
});
