import { intoIter } from '../iter/Iter';
import { sequence } from './sequence';

describe('sequence', () => {
  test('sequence default', () => {
    expect([...sequence([1, 2], [3, 4], [5, 6])]).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('sequence all', () => {
    expect([...sequence([1, 2, 3], [4], new Set([5, 6]), intoIter({ a: 7 }))]).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
