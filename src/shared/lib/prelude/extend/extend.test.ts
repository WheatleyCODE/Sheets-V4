import { extend } from './extend';

describe('extend', () => {
  test('extend works', () => {
    extend(Object, 'isTruly', (value: any) => Boolean(value));

    expect(!!Object.isTruly({ a: 1 })).toBe(true);
    expect(Object.isTruly({ a: 1 })).toBe(true);
  });
});
