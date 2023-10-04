import { PasswordValidErrors, passwordValidator } from './passwordValidator';

describe('passwordValidator', () => {
  test('Valid cases', () => {
    expect(passwordValidator('12345678')).toBe(null);
    expect(passwordValidator('1234567890')).toBe(null);
    expect(passwordValidator('alex28rus05')).toBe(null);
  });

  test('Invalid cases', () => {
    expect(passwordValidator('1234')).toBe(PasswordValidErrors.MIN);
    expect(passwordValidator('1234567')).toBe(PasswordValidErrors.MIN);
    expect(passwordValidator('12345678901234567890')).toBe(PasswordValidErrors.MAX);
    expect(passwordValidator('123456789012345678mypassword')).toBe(PasswordValidErrors.MAX);
  });

  test('Empty cases', () => {
    expect(passwordValidator('')).toBe(PasswordValidErrors.EMPTY);
    expect(passwordValidator(' ')).toBe(PasswordValidErrors.MIN);
  });
});
