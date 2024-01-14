import { templateRecommendsReducer } from './templateRecommendsSlice';
import { fetchTemplateRecommends } from '../services/fetch-template-recommends/fetchTemplateRecommends';
import { ITemplateRecommendsSchema } from '../types/templateRecommends.interface';
import { DeepPartial } from '@/shared/lib/ts-utils';

describe('templateRecommendsReducer', () => {
  test('Test templateRecommends fetchTemplateRecommends pending', () => {
    const state: DeepPartial<ITemplateRecommendsSchema> = {
      isLoading: false,
      error: 'error',
    };
    expect(templateRecommendsReducer(state as ITemplateRecommendsSchema, fetchTemplateRecommends.pending)).toEqual({
      isLoading: true,
      error: null,
    });
  });

  test('Test templateRecommends fetchTemplateRecommends rejected', () => {
    const state: DeepPartial<ITemplateRecommendsSchema> = {
      isLoading: true,
      error: 'error',
    };
    expect(templateRecommendsReducer(state as ITemplateRecommendsSchema, fetchTemplateRecommends.rejected)).toEqual({
      isLoading: false,
      error: null,
    });
  });
});
