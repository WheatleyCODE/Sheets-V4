import { normalizeClientSettings } from './normalizeClientSettings';

describe('normalizeClientSettings', () => {
  test('Correct value', () => {
    expect(normalizeClientSettings({ '[[SheetsV4-theme]]': 'light' })).toEqual({ '[[SheetsV4-theme]]': 'light' });
  });

  test('JSON value', () => {
    expect(normalizeClientSettings({ '[[SheetsV4-theme]]': '"light"' } as any)).toEqual({
      '[[SheetsV4-theme]]': 'light',
    });
  });
});
