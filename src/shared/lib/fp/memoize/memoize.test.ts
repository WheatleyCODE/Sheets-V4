import { memoize } from './memoize';

describe('memoize', () => {
  test('Memoize works', () => {
    let count = 0;

    const fn = memoize((a: number, b: number) => {
      count += 1;
      return a + b;
    });

    fn(1, 2);
    fn(1, 2);
    fn(1, 2);

    expect(fn(1, 2)).toBe(3);
    expect(count).toBe(1);
  });
});
