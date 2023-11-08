import { addQueryParams } from './addQueryParams';

describe('addQueryParams', () => {
  test('One param', () => {
    const params = addQueryParams({
      test: 'value',
    });

    expect(params).toBe('?test=value');
  });

  test('Multiple params', () => {
    const params = addQueryParams({
      test: 'value',
      second: '2',
    });

    expect(params).toBe('?test=value&second=2');
  });

  test('Undefined', () => {
    const params = addQueryParams({
      test: 'value',
      second: undefined,
    });

    expect(params).toBe('?test=value');
  });
});
