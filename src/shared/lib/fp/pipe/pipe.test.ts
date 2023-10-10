import { pipe } from './pipe';

describe('pipe', () => {
  test('Pipe works', () => {
    const fn1 = (num: number) => num;
    const add10 = (num: number) => num + 10;
    const mult2 = (num: number) => num * 2;

    const pipedFn1 = pipe<number>(mult2, add10, fn1);
    const pipedFn2 = pipe<number>(add10, mult2, fn1);
    const pipedFn3 = pipe<number>(fn1, add10, mult2);

    expect(pipedFn1(1)).toBe(12);
    expect(pipedFn2(1)).toBe(22);
    expect(pipedFn3(2)).toBe(24);
  });
});
