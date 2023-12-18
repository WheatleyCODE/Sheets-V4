import { sleep } from '../../promise';
import { Cache } from './cache';

describe('Cache', () => {
  describe('HashMemo', () => {
    test('Works', () => {
      const cache = new Cache(10);

      const value = { a: 10 };
      const sameValue = { a: 10 };

      cache.hashMemo(value);

      const prevValue = cache.hashMemo({ a: 10 });

      expect(value === prevValue).toBe(true);
      // @ts-ignore
      expect(value === { a: 10 }).toBe(false);
      expect(value === sameValue).toBe(false);
    });

    test('Times up', async () => {
      const cache = new Cache(10);

      const value = { a: 10 };

      cache.hashMemo(value, 2000);

      await sleep(1200);

      const prevValue = cache.hashMemo({ a: 10 });
      expect(value === prevValue).toBe(true);
    });

    test('Times out', async () => {
      const cache = new Cache(10);

      const value = { a: 10 };

      cache.hashMemo(value, 1000);

      await sleep(1200);

      const prevValue = cache.hashMemo({ a: 10 });
      expect(value === prevValue).toBe(false);
    });
  });
});
