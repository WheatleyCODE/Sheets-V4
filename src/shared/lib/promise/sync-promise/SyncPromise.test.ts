import { SyncPromise } from './SyncPromise';

describe('SyncPromise', () => {
  test('SyncPromise works', () => {
    const promise = new SyncPromise<number>((resolve) => resolve(42));

    let finallyIsCall = false;
    let catchIsCall = false;
    let result = 0;

    promise
      .then((value) => value + 100)
      .then((value) => value + 10)
      .then((value) => {
        result = value - 2;
        return value - 2;
      })
      .catch(() => {
        catchIsCall = true;
      })
      .finally(() => {
        finallyIsCall = true;
      });

    expect(promise[Symbol.toStringTag]).toBe('SyncPromise');
    expect(result).toBe(150);
    expect(catchIsCall).toBe(false);
    expect(finallyIsCall).toBe(true);
  });

  test('SyncPromise error', () => {
    const promise = new SyncPromise<number>((resolve) => resolve(42));

    let finallyIsCall = false;
    let catchIsCall = false;
    let result = 0;

    promise
      .then((value) => value + 100)
      .then((value) => value + 10)
      .then((value) => {
        result = value - 2;
        return value - 2;
      })
      .then(() => {
        // * Norm
        // @ts-ignore
        document.blabla();
        result = 0;
      })
      .catch(() => {
        catchIsCall = true;
      })
      .finally(() => {
        finallyIsCall = true;
      });

    expect(promise[Symbol.toStringTag]).toBe('SyncPromise');
    expect(result).toBe(150);
    expect(catchIsCall).toBe(true);
    expect(finallyIsCall).toBe(true);
  });
});
