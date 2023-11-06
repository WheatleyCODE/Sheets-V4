import { getQueryParams } from './addQueryParams';

describe('addQueryParams', () => {
  test('One param', () => {
    const params = getQueryParams({
      test: 'value',
    });

    expect(params).toBe('?test=value');
  });

  test('Multiple params', () => {
    const params = getQueryParams({
      test: 'value',
      second: '2',
    });

    expect(params).toBe('?test=value&second=2');
  });

  test('Undefined', () => {
    const params = getQueryParams({
      test: 'value',
      second: undefined,
    });

    expect(params).toBe('?test=value');
  });
});
