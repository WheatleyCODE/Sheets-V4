import { ageValidator } from './ageValidator';
import { AgeValidErrors } from './ageValidator.consts';

describe('ageValidator', () => {
  test('Valid cases', () => {
    expect(ageValidator('18')).toBe(null);
    expect(ageValidator('45')).toBe(null);
    expect(ageValidator('85')).toBe(null);
  });

  test('Invalid cases', () => {
    expect(ageValidator('0')).toBe(AgeValidErrors.MIN);
    expect(ageValidator('17')).toBe(AgeValidErrors.MIN);
    expect(ageValidator('86')).toBe(AgeValidErrors.MAX);
    expect(ageValidator('100')).toBe(AgeValidErrors.MAX);
  });

  test('Empty cases', () => {
    expect(ageValidator('')).toBe(AgeValidErrors.EMPTY);
    expect(ageValidator(' ')).toBe(AgeValidErrors.MIN);
  });

  test('Type errors cases', () => {
    expect(ageValidator('18d')).toBe(AgeValidErrors.TYPE);
    expect(ageValidator('d45')).toBe(AgeValidErrors.TYPE);
    expect(ageValidator('МНЕ 40 ЛЕТ!!!')).toBe(AgeValidErrors.TYPE);
  });
});
