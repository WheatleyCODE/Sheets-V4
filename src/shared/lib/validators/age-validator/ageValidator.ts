import { getValidator } from '../get-validator/getValidator';

export enum AgeValidErrors {
  MIN = 'Возраст должен быть больше 18 лет',
  MAX = 'Возраст должен быть меньше 85 лет',
  TYPE = 'Значение должно быть числом',
  EMPTY = 'Поле не может быть пустым',
}

export const ageValidator = getValidator({
  minNumber: {
    value: 18,
    textError: AgeValidErrors.MIN,
    notNumberError: AgeValidErrors.TYPE,
  },

  noEmpty: {
    value: true,
    textError: AgeValidErrors.EMPTY,
  },

  maxNumber: {
    value: 85,
    textError: AgeValidErrors.MAX,
    notNumberError: AgeValidErrors.TYPE,
  },
});
