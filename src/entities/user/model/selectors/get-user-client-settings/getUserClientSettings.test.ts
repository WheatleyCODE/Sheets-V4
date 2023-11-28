import { DeepPartial } from '@/shared/lib/ts-utils';
import { getClientSettings, getClientSettingsByKey } from './getUserClientSettings';
import { IStateSchema } from '@/app/providers/store-provider';

describe('Client settings', () => {
  describe('getClientSettings', () => {
    test('Return user state clientSettings prop', () => {
      const state: DeepPartial<IStateSchema> = {
        user: { user: { clientSettings: { '[[SheetsV4-theme]]': 'dark' } } },
      };

      expect(getClientSettings(state as IStateSchema)).toEqual({ theme: 'dark' });
    });

    test('Return user state clientSettings prop, empty', () => {
      const state: DeepPartial<IStateSchema> = {};

      expect(getClientSettings(state as IStateSchema)).toBe(undefined);
    });
  });

  describe('getClientSettingsByKey', () => {
    test('Return user state clientSettings prop', () => {
      const state: DeepPartial<IStateSchema> = {
        user: { user: { clientSettings: { '[[SheetsV4-theme]]': 'dark' } } },
      };

      expect(getClientSettingsByKey(state as IStateSchema, '[[SheetsV4-theme]]')).toEqual('dark');
    });

    test('Return user state clientSettings prop, error', () => {
      const state: DeepPartial<IStateSchema> = {
        user: { user: { clientSettings: { '[[SheetsV4-theme]]': 'dark' } } },
      };

      expect(getClientSettingsByKey(state as IStateSchema, 'blabla' as any)).toEqual(undefined);
    });

    test('Return user state clientSettings prop, empty', () => {
      const state: DeepPartial<IStateSchema> = {};

      expect(getClientSettingsByKey(state as IStateSchema, '[[SheetsV4-theme]]')).toBe(undefined);
    });
  });
});
