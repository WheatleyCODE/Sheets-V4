import { fetchTemplateById } from './fetchTemplateById';
import { TestAsyncThunk } from 'shared/lib/tests';
import { ITemplate } from '../../types/template.interface';
import { TemplateTags } from '../../consts/template.consts';

describe('fetchTemplateById', () => {
  test('Fulfilled', async () => {
    const template: ITemplate = {
      id: '1',
      createdAt: '26.06.2001',
      image: 'http://...',
      title: 'Шаблон',
      subtitle: 'Новый',
      tags: [TemplateTags.IT],
      blocks: [],
      template: {},
      views: 12345,
    };

    const thunk = new TestAsyncThunk(fetchTemplateById);
    thunk.api.get.mockReturnValue(Promise.resolve({ data: template }));

    const res = await thunk.callThunk({ id: '1' });

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('fulfilled');
    expect(res.payload).toEqual(template);
  });

  test('Rejected', async () => {
    const thunk = new TestAsyncThunk(fetchTemplateById);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const res = await thunk.callThunk({ id: '1' });

    expect(thunk.api.get).toHaveBeenCalled();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(res.meta.requestStatus).toBe('rejected');
    expect(res.payload).toBe('Ошибка при загрузке шаблона');
  });
});
