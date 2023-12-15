import { List } from './list';

describe('List', () => {
  test('ForEach', () => {
    const list = new List<number>([1, 2, 3, 4, 5]);

    let sum = 0;

    list.forEach((num) => {
      sum += num;
    });

    expect(sum).toBe(15);
  });

  test('ToArray', () => {
    const list = new List<number>([1, 2, 3, 4, 5]);

    expect(list.toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  test('Map + toArray', () => {
    const list = new List<number>([1, 2, 3, 4, 5]);

    const newList = list.map((num) => String(num * 10));

    expect(newList.toArray()).toEqual(['10', '20', '30', '40', '50']);
  });
});
