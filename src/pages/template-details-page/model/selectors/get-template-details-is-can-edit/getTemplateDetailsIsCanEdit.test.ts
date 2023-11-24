import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplateDetailsIsCanEdit } from './getTemplateDetailsIsCanEdit';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getTemplateDetailsIsCanEdit', () => {
  test('Return user can edit true', () => {
    const state: DeepPartial<IStateSchema> = {
      templateDetails: { template: { id: '2222', user: { id: '1' } } },
      user: { user: { id: '1' } },
    };

    expect(getTemplateDetailsIsCanEdit(state as IStateSchema)).toBe(true);
  });

  test('Return user can edit false', () => {
    const state: DeepPartial<IStateSchema> = {
      templateDetails: { template: { id: '2222', user: { id: '3333333' } } },
      user: { user: { id: '1' } },
    };

    expect(getTemplateDetailsIsCanEdit(state as IStateSchema)).toBe(false);
  });
});
