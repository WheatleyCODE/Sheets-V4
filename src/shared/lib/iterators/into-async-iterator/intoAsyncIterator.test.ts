import { intoAsyncIterator } from './IntoAsyncIterator';

describe('intoIterator', () => {
  test('Object', async () => {
    const array = [];
    const asyncIter = intoAsyncIterator({ a: 1, b: 101 });

    for await (const res of asyncIter) {
      array.push(res);
    }

    expect(array).toStrictEqual([1, 101]);
  });

  test('Array', async () => {
    const array = [];
    const asyncIter = intoAsyncIterator([1, 2, 3, 4]);

    for await (const res of asyncIter) {
      array.push(res);
    }

    expect(array).toStrictEqual([1, 2, 3, 4]);
  });

  test('Set', async () => {
    const array = [];
    const asyncIter = intoAsyncIterator(new Set([1, 2, 3, 4, 5]));

    for await (const res of asyncIter) {
      array.push(res);
    }

    expect(array).toStrictEqual([1, 2, 3, 4, 5]);
  });
});
