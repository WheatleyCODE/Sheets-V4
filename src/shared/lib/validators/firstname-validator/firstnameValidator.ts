import { getValidator } from '../get-validator/getValidator';

export enum FirstnameValidErrors {
  MIN = 'Имя должно быть больше 3 символов',
  MAX = 'Имя должно быть меньше 14 символов',
  EMPTY = 'Поле не может быть пустым',
}

export const firstnameValidator = getValidator({
  minLength: {
    value: 3,
    textError: FirstnameValidErrors.MIN,
  },

  noEmpty: {
    value: true,
    textError: FirstnameValidErrors.EMPTY,
  },

  maxLength: {
    value: 14,
    textError: FirstnameValidErrors.MAX,
  },
});
