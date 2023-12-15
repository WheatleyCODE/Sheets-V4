import { BaseList } from './baseList';

describe('BaseList', () => {
  test('Base', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');

    expect(list.length).toBe(3);
    expect(list.first).toEqual(['1', ['2', ['3', undefined]]]);
    expect(list.last).toEqual(['3', undefined]);
  });

  test('Iterator', () => {
    const list = new BaseList([10, 10, 20, 35, 70]);

    list.push(20);
    list.shift(1);

    let sum = 0;

    for (const value of list) {
      sum += value;
    }

    expect(sum).toBe(166);
  });

  test('Shift', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.shift('0');

    expect(list.length).toBe(4);
    expect(list.first).toEqual(['0', ['1', ['2', ['3', undefined]]]]);
    expect(list.last).toEqual(['3', undefined]);
  });

  test('Shift first', () => {
    const list = new BaseList<string>();

    list.shift('2');
    list.shift('1');
    list.shift('0');
    list.push('3');

    expect(list.length).toBe(4);
    expect(list.first).toEqual(['0', ['1', ['2', ['3', undefined]]]]);
    expect(list.last).toEqual(['3', undefined]);
  });

  test('Pop', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.shift('0');

    expect(list.length).toBe(4);
    expect(list.first).toEqual(['0', ['1', ['2', ['3', undefined]]]]);

    const node = list.pop();
    expect(node).toEqual(['3', undefined]);

    expect(list.length).toBe(3);

    expect(list.first).toEqual(['0', ['1', ['2', undefined]]]);
    expect(list.last).toEqual(['2', undefined]);
  });

  test('Pop last', () => {
    const list = new BaseList<string>();

    list.push('1');

    expect(list.first).toEqual(['1', undefined]);
    expect(list.last).toEqual(['1', undefined]);
    expect(list.length).toBe(1);

    const node = list.pop();
    expect(node).toEqual(['1', undefined]);

    expect(list.length).toBe(0);

    expect(list.first).toEqual(undefined);
    expect(list.last).toEqual(undefined);
  });

  test('Remove center', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.shift('0');

    expect(list.length).toBe(4);

    const node = list.remove('2');

    expect(node).toEqual(['2', ['3', undefined]]);
    expect(list.length).toBe(3);

    expect(list.first).toEqual(['0', ['1', ['3', undefined]]]);
    expect(list.last).toEqual(['3', undefined]);
  });

  test('Remove first', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.shift('0');

    expect(list.length).toBe(4);

    const node = list.remove('0');

    expect(node).toEqual(['0', ['1', ['2', ['3', undefined]]]]);
    expect(list.length).toBe(3);

    expect(list.first).toEqual(['1', ['2', ['3', undefined]]]);
    expect(list.last).toEqual(['3', undefined]);
  });

  test('Remove last', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.shift('0');

    expect(list.length).toBe(4);

    const node = list.remove('3');

    expect(node).toEqual(['3', undefined]);
    expect(list.length).toBe(3);

    expect(list.first).toEqual(['0', ['1', ['2', undefined]]]);
    expect(list.last).toEqual(['2', undefined]);
  });

  test('Remove all random', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.push('4');
    list.push('5');
    list.shift('0');

    expect(list.length).toBe(6);

    const node = list.remove('5');

    expect(node).toEqual(['5', undefined]);
    expect(list.length).toBe(5);
    expect(list.first).toEqual(['0', ['1', ['2', ['3', ['4', undefined]]]]]);
    expect(list.last).toEqual(['4', undefined]);

    const node1 = list.remove('0');

    expect(node1).toEqual(['0', ['1', ['2', ['3', ['4', undefined]]]]]);
    expect(list.length).toBe(4);
    expect(list.first).toEqual(['1', ['2', ['3', ['4', undefined]]]]);
    expect(list.last).toEqual(['4', undefined]);

    const node2 = list.remove('2');
    expect(node2).toEqual(['2', ['3', ['4', undefined]]]);
    expect(list.length).toBe(3);
    expect(list.first).toEqual(['1', ['3', ['4', undefined]]]);
    expect(list.last).toEqual(['4', undefined]);

    const node3 = list.remove('3');

    expect(node3).toEqual(['3', ['4', undefined]]);
    expect(list.length).toBe(2);
    expect(list.first).toEqual(['1', ['4', undefined]]);
    expect(list.last).toEqual(['4', undefined]);

    const node4 = list.remove('1');

    expect(node4).toEqual(['1', ['4', undefined]]);
    expect(list.length).toBe(1);
    expect(list.first).toEqual(['4', undefined]);
    expect(list.last).toEqual(['4', undefined]);

    const node5 = list.remove('4');

    expect(node5).toEqual(['4', undefined]);
    expect(list.length).toBe(0);
    expect(list.first).toEqual(undefined);
    expect(list.last).toEqual(undefined);
  });

  test('All methods random', () => {
    const list = new BaseList<string>();

    const node1 = list.shift('0');
    const node2 = list.push('1');

    expect(list.length).toEqual(2);
    expect(list.first).toEqual(['0', ['1', undefined]]);
    expect(list.last).toEqual(['1', undefined]);
    expect(node1).toEqual(['0', ['1', undefined]]);
    expect(node2).toEqual(['1', undefined]);

    expect(node2 === list.last);
    expect(node1 === list.first);

    const node3 = list.remove('0');
    const node4 = list.pop();

    expect(list.length).toEqual(0);
    expect(list.first).toEqual(undefined);
    expect(list.last).toEqual(undefined);
    expect(node3).toEqual(['0', ['1', undefined]]);
    expect(node4).toEqual(['1', undefined]);

    const node5 = list.push('20');
    const node6 = list.push('30');
    const node7 = list.shift('10');

    expect(list.length).toEqual(3);
    expect(node7).toEqual(['10', ['20', ['30', undefined]]]);
    expect(node5).toEqual(['20', ['30', undefined]]);
    expect(node6).toEqual(['30', undefined]);

    const node8 = list.push('40');
    const node9 = list.push('50');

    expect(list.length).toEqual(5);
    expect(node8).toEqual(['40', ['50', undefined]]);
    expect(node9).toEqual(['50', undefined]);
    expect(list.first).toEqual(['10', ['20', ['30', ['40', ['50', undefined]]]]]);
    expect(list.last).toEqual(['50', undefined]);

    const node10 = list.remove('20');

    expect(node10).toEqual(['20', ['30', ['40', ['50', undefined]]]]);
    expect(list.first).toEqual(['10', ['30', ['40', ['50', undefined]]]]);
    expect(list.last).toEqual(['50', undefined]);
    expect(list.length).toEqual(4);

    const node11 = list.pop();

    expect(node11).toEqual(['50', undefined]);
    expect(list.first).toEqual(['10', ['30', ['40', undefined]]]);
    expect(list.last).toEqual(['40', undefined]);
    expect(list.length).toEqual(3);

    const node12 = list.pop();
    const node13 = list.pop();
    const node14 = list.push('20');
    const node16 = list.shift('0');
    const node17 = list.unshift();
    const node15 = list.pop();

    expect(node12).toEqual(['40', undefined]);
    expect(node13).toEqual(['30', undefined]);
    expect(node14).toEqual(['20', undefined]);
    expect(node15).toEqual(['20', undefined]);
    expect(node16).toEqual(['0', ['10', undefined]]);
    expect(node17).toEqual(['0', ['10', undefined]]);
    expect(list.length).toEqual(1);
    expect(list.first).toEqual(['10', undefined]);
    expect(list.last).toEqual(['10', undefined]);
  });

  test('findValueByIndex', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.shift('0');

    expect(list.findValueByIndex(-1)).toBe(undefined);
    expect(list.findValueByIndex(0)).toBe('0');
    expect(list.findValueByIndex(1)).toBe('1');
    expect(list.findValueByIndex(2)).toBe('2');
    expect(list.findValueByIndex(3)).toBe('3');
    expect(list.findValueByIndex(4)).toBe(undefined);
    expect(list.first).toEqual(['0', ['1', ['2', ['3', undefined]]]]);
    expect(list.last).toEqual(['3', undefined]);
  });

  test('findNodeByIndex', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.shift('0');

    expect(list.findNodeByIndex(-1)).toEqual(undefined);
    expect(list.findNodeByIndex(0)).toEqual(['0', ['1', ['2', ['3', undefined]]]]);
    expect(list.findNodeByIndex(1)).toEqual(['1', ['2', ['3', undefined]]]);
    expect(list.findNodeByIndex(2)).toEqual(['2', ['3', undefined]]);
    expect(list.findNodeByIndex(3)).toEqual(['3', undefined]);
    expect(list.findNodeByIndex(4)).toEqual(undefined);
    expect(list.first).toEqual(['0', ['1', ['2', ['3', undefined]]]]);
    expect(list.last).toEqual(['3', undefined]);
  });

  test('findNodeByValue', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.shift('0');

    expect(list.findNodeByValue('null')).toEqual(undefined);
    expect(list.findNodeByValue('0')).toEqual(['0', ['1', ['2', ['3', undefined]]]]);
    expect(list.findNodeByValue('1')).toEqual(['1', ['2', ['3', undefined]]]);
    expect(list.findNodeByValue('2')).toEqual(['2', ['3', undefined]]);
    expect(list.findNodeByValue('3')).toEqual(['3', undefined]);
    expect(list.findNodeByValue('some')).toEqual(undefined);
    expect(list.first).toEqual(['0', ['1', ['2', ['3', undefined]]]]);
    expect(list.last).toEqual(['3', undefined]);
  });

  test('addAfterValue', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.shift('0');

    list.addAfterValue('2', 'new');

    expect(list.first).toEqual(['0', ['1', ['2', ['new', ['3', undefined]]]]]);
    expect(list.last).toEqual(['3', undefined]);
  });

  test('addBeforeValue', () => {
    const list = new BaseList<string>();

    list.push('1');
    list.push('2');
    list.push('3');
    list.shift('0');

    list.addBeforeValue('2', 'new');

    expect(list.first).toEqual(['0', ['1', ['new', ['2', ['3', undefined]]]]]);
    expect(list.last).toEqual(['3', undefined]);
  });
});
