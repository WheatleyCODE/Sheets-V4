import { curry } from './curry';

describe('curry', () => {
  test('Curry works', () => {
    const calc = (a: number, b: number, c: number, d: number) => a + b + c + d;

    const curryFn = curry(calc);

    expect(curryFn(1)(2)(3)(4)).toBe(10);
    expect(curryFn(4)(3)(2)(1)).toBe(10);
  });
});
