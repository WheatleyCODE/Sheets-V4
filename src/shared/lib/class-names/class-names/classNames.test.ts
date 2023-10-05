import { classNames } from '../class-names/classNames';

describe('classNames', () => {
  test('1 Main param', () => {
    expect(classNames('class')).toBe('class');
  });

  test('2 Params', () => {
    expect(classNames('class', { disable: true, flex: false }, [])).toBe('class disable');
  });

  test('3 Params', () => {
    expect(classNames('class', { disable: true, flex: false }, ['button', 'el'])).toBe('class button el disable');
  });

  test('3 Params', () => {
    expect(classNames('class', { disable: true, flex: true }, ['button', 'el'])).toBe('class button el disable flex');
  });

  test('3 Params', () => {
    expect(classNames('class', { disable: true, flex: undefined }, ['button', 'el'])).toBe('class button el disable');
  });
});
