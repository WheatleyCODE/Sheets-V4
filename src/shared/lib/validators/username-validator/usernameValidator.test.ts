import { UsernameValidErrors, usernameValidator } from './usernameValidator';

describe('usernameValidator', () => {
  test('Valid cases', () => {
    expect(usernameValidator('Вася')).toBe(null);
    expect(usernameValidator('Петя')).toBe(null);
    expect(usernameValidator('Оля')).toBe(null);
  });

  test('Invalid cases', () => {
    expect(usernameValidator('Дщ')).toBe(UsernameValidErrors.MIN);
    expect(usernameValidator('DS')).toBe(UsernameValidErrors.MIN);
    expect(usernameValidator('some random string for test')).toBe(UsernameValidErrors.MAX);
    expect(usernameValidator('some random string for test2')).toBe(UsernameValidErrors.MAX);
  });

  test('Empty cases', () => {
    expect(usernameValidator('')).toBe(UsernameValidErrors.EMPTY);
    expect(usernameValidator(' ')).toBe(UsernameValidErrors.MIN);
  });
});
