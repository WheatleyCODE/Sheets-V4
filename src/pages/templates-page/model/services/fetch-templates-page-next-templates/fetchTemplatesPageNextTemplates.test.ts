import { TestAsyncThunk } from 'shared/lib/tests';
import { fetchTemplatesPageNextTemplates } from './fetchTemplatesPageNextTemplates';
import { fetchTemplatesPageTemplates } from '../fetch-templates-page-templates/fetchTemplatesPageTemplates';

jest.mock('../fetch-templates-page-templates/fetchTemplatesPageTemplates.ts');

describe('fetchTemplatesPageNextTemplates', () => {
  test('Success', async () => {
    const thunk = new TestAsyncThunk(fetchTemplatesPageNextTemplates, {
      templatesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchTemplatesPageTemplates).toHaveBeenCalled();
  });

  test('fetchTemplatesPageTemplates not called', async () => {
    const thunk = new TestAsyncThunk(fetchTemplatesPageNextTemplates, {
      templatesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    });

    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchTemplatesPageTemplates).not.toHaveBeenCalled();
  });
});
