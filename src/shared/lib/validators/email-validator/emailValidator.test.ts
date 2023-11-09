import { emailValidator } from './emailValidator';
import { EmailValidErrors } from './emailValidator.consts';

describe('emailValidator', () => {
  test('Valid cases', () => {
    expect(emailValidator('ya@mail.ru')).toBe(null);
    expect(emailValidator('fsb@rf.ru')).toBe(null);
    expect(emailValidator('mymail@yandex.ru')).toBe(null);
    expect(emailValidator('mymail@gmail.com')).toBe(null);
  });

  test('Invalid cases', () => {
    expect(emailValidator('ya@mail_ru')).toBe(EmailValidErrors.INCORRECT);
    expect(emailValidator('ya2mail.ru')).toBe(EmailValidErrors.INCORRECT);
    expect(emailValidator('some random string for tests')).toBe(EmailValidErrors.INCORRECT);
    expect(emailValidator('123456789012345678myfirstname')).toBe(EmailValidErrors.INCORRECT);
  });

  test('Empty cases', () => {
    expect(emailValidator('')).toBe(EmailValidErrors.EMPTY);
    expect(emailValidator(' ')).toBe(EmailValidErrors.INCORRECT);
  });
});
