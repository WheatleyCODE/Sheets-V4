import { compose } from './compose';

describe('compose', () => {
  test('Compose works', () => {
    const fn1 = (num: number) => num;
    const add10 = (num: number) => num + 10;
    const mult2 = (num: number) => num * 2;

    const composedFn1 = compose<number>(mult2, add10, fn1);
    const composedFn2 = compose<number>(add10, mult2, fn1);
    const composedFn3 = compose<number>(fn1, add10, mult2);

    expect(composedFn1(1)).toBe(22);
    expect(composedFn2(1)).toBe(12);
    expect(composedFn3(2)).toBe(14);
  });
});
