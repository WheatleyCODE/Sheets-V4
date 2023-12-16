import { hashFunction } from './hashFunction';

describe('HashFunction', () => {
  test('Works', () => {
    const hash = hashFunction({ a: 10, b: 20, c: 30, y: 'str' });
    const hash1 = hashFunction({ a: 10, b: 20, c: 30, y: 'str' });
    const hash2 = hashFunction({ a: 10, b: 20, c: 30, y: 'str' });
    const hash3 = hashFunction({ a: 10, b: 20, c: 30, y: 'str' });

    expect(hash).toBe('2984325697');
    expect(hash).toBe(hash1);
    expect(hash1).toBe(hash2);
    expect(hash2).toBe(hash3);
    expect(hash3).toBe(hash);
  });

  test('Not equal', () => {
    const hash = hashFunction({ a: 10, b: 20, c: 30, y: 'str' });
    const hash1 = hashFunction({ a: 10, b: 20, c: 30, y: 'str' });
    const hash2 = hashFunction({ a: 10, b: 20, c: 30, y: 'str' });
    const hash3 = hashFunction({ a: 10, b: 20, c: 30, y: 'str' });

    const hashNew = hashFunction({ a: 100, b: 20, c: 30, y: 'str' });
    const hashNew2 = hashFunction({ a: 10, b: 2, c: 30, y: 'str' });
    const hashNew3 = hashFunction({ a: 10, b: 20, c: 31, y: 'str' });
    const hashNew4 = hashFunction({ a: 10, b: 20, c: 30, y: 'str1' });
    const hashNew5 = hashFunction({ a: 10, b: 20, c: 30, y: 'str', obj: {} });

    expect(hash).toBe('2984325697');
    expect(hash).toBe(hash1);
    expect(hash1).toBe(hash2);
    expect(hash2).toBe(hash3);
    expect(hash3).toBe(hash);

    expect(hashNew).not.toBe(hash);
    expect(hashNew2).not.toBe(hash);
    expect(hashNew3).not.toBe(hash);
    expect(hashNew4).not.toBe(hash);
    expect(hashNew5).not.toBe(hash);
  });

  test('Length', () => {
    const hash = hashFunction({ a: 10, b: 20, c: 30, y: 'str' });

    const hash2 = hashFunction({
      a: 10000000000000,
      b: 2000000000000,
      c: 300000000001,
      y: 'Super str. Super str. Super str. Super str. Super str. Super str. Super str.',
    });

    const hash3 = hashFunction({
      a: 10,
      b: 20,
      c: 30,
      y: 'str',
      obj: {
        a: 10,
        b: 20,
        c: 30,
        y: 'str',
        obj: {
          a: 10,
          b: 20,
          c: 30,
          y: 'str',
          obj: {
            a: 10,
            b: 20,
            c: 30,
            y: 'str',
            obj: {
              a: 10,
              b: 20,
              c: 30,
              y: 'str',
              obj: { a: 10, b: 20, c: 30, y: 'str', obj: { a: 10, b: 20, c: 30, y: 'str' } },
            },
          },
        },
      },
    });

    expect(hash2).toBe('1906398785');
    expect(hash3).toBe('-48110283555');
    expect(hash).toBe('2984325697');
  });
});
