import { IValidatorOptions } from '../interface';
import { getValidator } from './getValidator';

describe('getValidator', () => {
  test('Return type function', () => {
    expect(typeof getValidator({})).toBe('function');
  });

  test('Return null', () => {
    expect(getValidator({})('random str')).toBe(null);
  });

  test('Validation works', () => {
    const params: IValidatorOptions = {
      maxLength: {
        textError: 'error',
        value: 2,
      },
    };

    expect(getValidator(params)('validatestring')).toBe('error');
    expect(getValidator(params)('My name')).toBe('error');
    expect(getValidator(params)('13213123131')).toBe('error');
    expect(getValidator(params)('12')).toBe(null);
    expect(getValidator(params)('ee')).toBe(null);
  });

  test('Validation works2', () => {
    const params: IValidatorOptions = {
      minLength: {
        textError: 'min',
        value: 2,
      },

      noEmpty: {
        textError: 'empty',
        value: true,
      },

      maxLength: {
        textError: 'max',
        value: 6,
      },
    };

    expect(getValidator(params)('ya')).toBe(null);
    expect(getValidator(params)('name')).toBe(null);
    expect(getValidator(params)('name12')).toBe(null);
    expect(getValidator(params)('name1245')).toBe('max');
    expect(getValidator(params)('name1245-name1245')).toBe('max');
    expect(getValidator(params)('M')).toBe('min');
    expect(getValidator(params)('')).toBe('empty');
  });
});
