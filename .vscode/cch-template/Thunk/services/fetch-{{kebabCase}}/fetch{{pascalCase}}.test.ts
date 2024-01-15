import { TestAsyncThunk } from '@/shared/lib/tests';
import { fetch{{pascalCase}} } from './fetch{{pascalCase}}';
import type { I{{pascalCase}} } from '../../types/{{camelCase}}.interface';

describe('fetch{{pascalCase}}', () => {
  test('Fulfilled', async () => {
    const {{camelCase}}: I{{pascalCase}} = {
      a: null,
    };

    const thunk = new TestAsyncThunk(fetch{{pascalCase}});
    thunk.api.get.mockReturnValue(Promise.resolve({ data: {{camelCase}} }));

    const res = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(res.payload).toEqual({{camelCase}});
  });

  test('Rejected', async () => {
    const thunk = new TestAsyncThunk(fetch{{pascalCase}});
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const res = await thunk.callThunk();

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toBe('Ошибка {{camelCase}}');
  });
});
