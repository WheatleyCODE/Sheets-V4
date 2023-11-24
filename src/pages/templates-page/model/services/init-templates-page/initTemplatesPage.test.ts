import { TestAsyncThunk } from '@/shared/lib/tests';
import { initTemplatesPage } from './initTemplatesPage';
import { fetchTemplatesPageTemplates } from '../fetch-templates-page-templates/fetchTemplatesPageTemplates';

jest.mock('../fetch-templates-page-templates/fetchTemplatesPageTemplates.ts');

describe('initTemplatesPage', () => {
  test('Success', async () => {
    const thunk = new TestAsyncThunk(initTemplatesPage, {});

    const search = { get: () => 'str' } as unknown as URLSearchParams;
    const res = await thunk.callThunk(search);

    expect(thunk.dispatch).toHaveBeenCalledTimes(8);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(fetchTemplatesPageTemplates).toHaveBeenCalled();
  });

  test('Success inited', async () => {
    const thunk = new TestAsyncThunk(initTemplatesPage, { templatesPage: { _inited: true } });

    const search = { get: () => 'str' } as unknown as URLSearchParams;
    const res = await thunk.callThunk(search);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(fetchTemplatesPageTemplates).not.toBeCalled();
  });

  test('Reject', async () => {
    const thunk = new TestAsyncThunk(initTemplatesPage, {});

    const search = { get: 'for error' } as unknown as URLSearchParams;
    const res = await thunk.callThunk(search);

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(fetchTemplatesPageTemplates).not.toBeCalled();
    expect(res.payload).toBe('Ошибка при инициализации страницы');
  });
});
