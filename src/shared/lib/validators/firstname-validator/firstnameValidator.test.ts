import { FirstnameValidErrors, firstnameValidator } from './firstnameValidator';

describe('firstnameValidator', () => {
  test('Valid cases', () => {
    expect(firstnameValidator('Дима')).toBe(null);
    expect(firstnameValidator('Вася')).toBe(null);
    expect(firstnameValidator('Григорий')).toBe(null);
  });

  test('Invalid cases', () => {
    expect(firstnameValidator('ВЩ')).toBe(FirstnameValidErrors.MIN);
    expect(firstnameValidator('D')).toBe(FirstnameValidErrors.MIN);
    expect(firstnameValidator('some random string for tests')).toBe(FirstnameValidErrors.MAX);
    expect(firstnameValidator('123456789012345678myfirstname')).toBe(FirstnameValidErrors.MAX);
  });

  test('Empty cases', () => {
    expect(firstnameValidator('')).toBe(FirstnameValidErrors.EMPTY);
    expect(firstnameValidator(' ')).toBe(FirstnameValidErrors.MIN);
  });
});
