import { intoIter } from './Iter';

describe('Iter', () => {
  test('Object', () => {
    const iter = intoIter<number>({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });

    const array = iter
      .filter((el) => el > 2)
      .map((el) => el * 10)
      .take(3)
      .toArray();

    expect(array).toStrictEqual([30, 40, 50]);
  });

  test('Object + enumerate', () => {
    const iter = intoIter<number>({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });

    const array = iter
      .filter((el) => el > 2)
      .map((el) => el * 10)
      .take(3)
      .enumerate()
      .toArray();

    expect(array).toStrictEqual([
      [30, 0],
      [40, 1],
      [50, 2],
    ]);
  });

  test('Array', () => {
    const iter = intoIter<string>(['hello', 'world', '1', '1', '1']);

    const array = iter
      .filter((el) => el === '1')
      .map((el) => el.repeat(3))
      .toArray();

    expect(array).toStrictEqual(['111', '111', '111']);
  });

  test('Set', () => {
    const iter = intoIter<number>(new Set([1, 2, 3, 4, 5, 6]));

    const array = iter
      .filter((el) => el > 2)
      .map((el) => el.toString().repeat(3))
      .take(2)
      .toArray();

    expect(array).toStrictEqual(['333', '444']);
  });
});
