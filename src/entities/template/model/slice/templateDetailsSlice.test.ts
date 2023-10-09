import { ITemplate, ITemplateDetailsSchema, TemplateTags } from '../types/template';
import { templateDetailsReducer, templateDetailsActions } from './templateDetailsSlice';
import { DeepPartial } from 'shared/lib/ts-utils';

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

describe('templateDetailsSlice', () => {
  test('Test profile setTemplate', () => {
    const state: DeepPartial<ITemplateDetailsSchema> = {};

    expect(
      templateDetailsReducer(state as ITemplateDetailsSchema, templateDetailsActions.setTemplate(template)),
    ).toEqual({
      template,
    });
  });

  test('Test profile setError', () => {
    const state: DeepPartial<ITemplateDetailsSchema> = {
      error: null,
    };

    expect(
      templateDetailsReducer(state as ITemplateDetailsSchema, templateDetailsActions.setError('My error')),
    ).toEqual({
      error: 'My error',
    });
  });
});
