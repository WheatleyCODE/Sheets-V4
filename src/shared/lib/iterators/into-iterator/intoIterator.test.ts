import { intoIterator } from './intoIterator';

describe('intoIterator', () => {
  test('Object', () => {
    const array = [...intoIterator({ a: 1, b: 101 })];
    expect(array).toStrictEqual([1, 101]);
  });

  test('Array', () => {
    const array = [...intoIterator([1, 2, 3])];
    expect(array).toStrictEqual([1, 2, 3]);
  });

  test('Set', () => {
    const array = [...intoIterator(new Set([1, 2, 3, 4]))];
    expect(array).toStrictEqual([1, 2, 3, 4]);
  });
});
