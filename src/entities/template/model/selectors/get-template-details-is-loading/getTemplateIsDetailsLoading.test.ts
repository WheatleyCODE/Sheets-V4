import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplateDetailsIsLoading } from './getTemplateIsDetailsLoading';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getTemplateDetailsIsLoading', () => {
  test('Return template state isLoading prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templateDetails: { isLoading: true },
    };

    expect(getTemplateDetailsIsLoading(state as IStateSchema)).toBe(true);
  });

  test('Return template state isLoading prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplateDetailsIsLoading(state as IStateSchema)).toBe(false);
  });
});
