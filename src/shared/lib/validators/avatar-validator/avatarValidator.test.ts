import { avatarValidator } from './avatarValidator';
import { AvatarValidErrors } from './avatarValidator.consts';

describe('avatarValidator', () => {
  test('Valid cases', () => {
    expect(avatarValidator('ya@mail.ru')).toBe(null);
    expect(avatarValidator('Я-АВАТАР')).toBe(null);
    expect(avatarValidator('ВАЛИДАЦИИ НЕТ')).toBe(null);
    expect(avatarValidator('Москва')).toBe(null);
    expect(avatarValidator('http://...')).toBe(null);
  });

  test('Empty cases', () => {
    expect(avatarValidator('')).toBe(AvatarValidErrors.EMPTY);
  });
});
