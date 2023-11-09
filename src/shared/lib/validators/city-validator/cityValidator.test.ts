import { cityValidator } from './cityValidator';
import { CityValidErrors } from './cityValidator.consts';

describe('cityValidator', () => {
  test('Valid cases', () => {
    expect(cityValidator('ya@mail.ru')).toBe(null);
    expect(cityValidator('Я-ГОРОД')).toBe(null);
    expect(cityValidator('ВАЛИДАЦИИ НЕТ')).toBe(null);
    expect(cityValidator('Москва')).toBe(null);
  });

  test('Empty cases', () => {
    expect(cityValidator('')).toBe(CityValidErrors.EMPTY);
  });
});
