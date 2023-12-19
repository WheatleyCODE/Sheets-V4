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

  describe('Set & get & has & remove', () => {
    test('Works', () => {
      const cache = new Cache(10);
      const testValue = { a: 10 };

      cache.set('value', testValue);
      cache.set('123', 123);
      cache.set('str', 'str');

      const value = cache.get('value');

      expect(cache.has('value')).toBe(true);
      expect(cache.length).toBe(3);
      expect(value === testValue).toBe(true);
      expect(value).toEqual(testValue);
      expect(cache.has('123')).toBe(true);
      expect(cache.has('str')).toBe(true);

      cache.remove('value');

      expect(cache.has('123')).toBe(true);
      expect(cache.has('str')).toBe(true);
      expect(cache.get('123')).toBe(123);
      expect(cache.get('str')).toBe('str');
      expect(cache.has('value')).toBe(false);
      expect(cache.length).toBe(2);
      expect(cache.get('value')).toBe(undefined);

      cache.unshift();

      expect(cache.has('123')).toBe(false);
      expect(cache.has('str')).toBe(true);
      expect(cache.get('123')).toBe(undefined);
      expect(cache.get('str')).toBe('str');
      expect(cache.has('value')).toBe(false);
      expect(cache.length).toBe(1);
      expect(cache.get('value')).toBe(undefined);

      cache.pop();

      expect(cache.has('123')).toBe(false);
      expect(cache.has('str')).toBe(false);
      expect(cache.get('123')).toBe(undefined);
      expect(cache.get('str')).toBe(undefined);
      expect(cache.has('value')).toBe(false);
      expect(cache.length).toBe(0);
      expect(cache.get('value')).toBe(undefined);
    });

    test('Times out', async () => {
      const cache = new Cache(10);
      const testValue = { a: 10 };

      cache.set('value', testValue, 3000);
      cache.set('123', 123, 2000);
      cache.set('str', 'str', 1000);

      expect(cache.has('value')).toBe(true);
      expect(cache.has('123')).toBe(true);
      expect(cache.has('str')).toBe(true);

      expect(testValue === cache.get('value'));
      expect(cache.get('value')).toEqual({ a: 10 });
      expect(cache.get('123')).toBe(123);
      expect(cache.get('str')).toBe('str');

      expect(cache.length).toBe(3);

      await sleep(1100);

      expect(cache.has('value')).toBe(true);
      expect(cache.has('123')).toBe(true);
      expect(cache.has('str')).toBe(false);

      expect(testValue === cache.get('value')).toBe(true);
      expect(cache.get('value')).toEqual({ a: 10 });
      expect(cache.get('123')).toBe(123);
      expect(cache.get('str')).toBe(undefined);

      expect(cache.length).toBe(2);

      await sleep(1100);

      expect(cache.has('value')).toBe(true);
      expect(cache.has('123')).toBe(false);
      expect(cache.has('str')).toBe(false);

      expect(testValue === cache.get('value')).toBe(true);
      expect(cache.get('value')).toEqual({ a: 10 });
      expect(cache.get('123')).toBe(undefined);
      expect(cache.get('str')).toBe(undefined);

      expect(cache.length).toBe(1);

      await sleep(1100);

      expect(cache.has('value')).toBe(false);
      expect(cache.has('123')).toBe(false);
      expect(cache.has('str')).toBe(false);

      expect(testValue === cache.get('value')).toBe(false);
      expect(cache.get('value')).toBe(undefined);
      expect(cache.get('123')).toBe(undefined);
      expect(cache.get('str')).toBe(undefined);

      expect(cache.length).toBe(0);
    });
  });

  describe('Max items', () => {
    test('Works', () => {
      const cache = new Cache(5);

      cache.set('1', 1);
      cache.set('2', 2);
      cache.set('3', 3);
      cache.set('4', 4);
      cache.set('5', 5);

      expect(cache.has('1')).toBe(true);
      expect(cache.has('2')).toBe(true);
      expect(cache.has('3')).toBe(true);
      expect(cache.has('4')).toBe(true);
      expect(cache.has('5')).toBe(true);
      expect(cache.length).toBe(5);

      cache.set('6', 6);

      expect(cache.has('1')).toBe(false);
      expect(cache.has('2')).toBe(true);
      expect(cache.has('3')).toBe(true);
      expect(cache.has('4')).toBe(true);
      expect(cache.has('5')).toBe(true);
      expect(cache.has('6')).toBe(true);
      expect(cache.length).toBe(5);

      cache.set('7', 7);
      cache.set('8', 8);

      expect(cache.has('1')).toBe(false);
      expect(cache.has('2')).toBe(false);
      expect(cache.has('3')).toBe(false);
      expect(cache.has('4')).toBe(true);
      expect(cache.has('5')).toBe(true);
      expect(cache.has('6')).toBe(true);
      expect(cache.has('7')).toBe(true);
      expect(cache.has('8')).toBe(true);
      expect(cache.length).toBe(5);
    });
  });
});
