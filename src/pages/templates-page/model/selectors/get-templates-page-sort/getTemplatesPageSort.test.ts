import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplatesPageSort } from './getTemplatesPageSort';
import { IStateSchema } from '@/app/providers/store-provider';
import { TemplateSortFields } from '../../consts/templatesPage.consts';

describe('getTemplatesPageSort', () => {
  test('Return template page state sort prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { sort: TemplateSortFields.VIEWS },
    };

    expect(getTemplatesPageSort(state as IStateSchema)).toBe(TemplateSortFields.VIEWS);
  });

  test('Return template page state sort prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageSort(state as IStateSchema)).toBe(TemplateSortFields.VIEWS);
  });
});
