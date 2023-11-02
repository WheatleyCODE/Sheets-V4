import { templateCommentsReducer } from './templateCommentsSlice';
import { fetchTemplateComments } from '../services/fetch-template-comments/fetchTemplateComments';
import { ITemplateCommentsSchema } from '../types/templateComments';
import { DeepPartial } from 'shared/lib/ts-utils';

describe('templateCommentsReducer', () => {
  test('Test templateComments fetchTemplateComments pending', () => {
    const state: DeepPartial<ITemplateCommentsSchema> = {
      isLoading: false,
      error: 'error',
    };

    expect(templateCommentsReducer(state as ITemplateCommentsSchema, fetchTemplateComments.pending)).toEqual({
      isLoading: true,
      error: null,
    });
  });

  test('Test templateComments fetchTemplateComments rejected', () => {
    const state: DeepPartial<ITemplateCommentsSchema> = {
      isLoading: true,
      error: 'error',
    };

    expect(templateCommentsReducer(state as ITemplateCommentsSchema, fetchTemplateComments.rejected)).toEqual({
      isLoading: false,
      error: null,
    });
  });
});
