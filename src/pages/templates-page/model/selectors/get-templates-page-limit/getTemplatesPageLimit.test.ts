import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplatesPageLimit } from './getTemplatesPageLimit';
import { IStateSchema } from '@/app/providers/store-provider';
import { SQUARES_TEMPLATE_COUNT } from '@/entities/template/model/consts/template.consts';

describe('getTemplatesPageIsLoading', () => {
  test('Return template page state limit prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { limit: SQUARES_TEMPLATE_COUNT },
    };

    expect(getTemplatesPageLimit(state as IStateSchema)).toBe(SQUARES_TEMPLATE_COUNT);
  });

  test('Return template page state limit prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageLimit(state as IStateSchema)).toBe(SQUARES_TEMPLATE_COUNT);
  });
});
