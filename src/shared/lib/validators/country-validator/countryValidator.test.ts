import { countryValidator } from './countryValidator';
import { CountryValidErrors } from './countryValidator.consts';

describe('countryValidator', () => {
  test('Valid cases', () => {
    expect(countryValidator('ya@mail.ru')).toBe(null);
    expect(countryValidator('Я-СТРАНА')).toBe(null);
    expect(countryValidator('ВАЛИДАЦИИ НЕТ')).toBe(null);
    expect(countryValidator('Россия')).toBe(null);
  });

  test('Empty cases', () => {
    expect(countryValidator('')).toBe(CountryValidErrors.EMPTY);
  });
});
