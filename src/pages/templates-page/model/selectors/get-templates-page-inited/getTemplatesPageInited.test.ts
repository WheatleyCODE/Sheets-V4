import { DeepPartial } from '@/shared/lib/ts-utils';
import { getTemplatesPageInited } from './getTemplatesPageInited';
import { IStateSchema } from '@/app/providers/store-provider';

describe('getTemplatesPageInited', () => {
  test('Return template page state _inited prop', () => {
    const state: DeepPartial<IStateSchema> = {
      templatesPage: { _inited: true },
    };

    expect(getTemplatesPageInited(state as IStateSchema)).toBe(true);
  });

  test('Return template page state _inited prop, empty', () => {
    const state: DeepPartial<IStateSchema> = {};

    expect(getTemplatesPageInited(state as IStateSchema)).toBe(false);
  });
});
