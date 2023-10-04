import { getValidator } from '../get-validator/getValidator';

export enum LastnameValidErrors {
  MIN = 'Фамилия должна быть больше 3 символов',
  MAX = 'Фамилия должна быть меньше 18 символов',
  EMPTY = 'Поле не может быть пустым',
}

export const lastnameValidator = getValidator({
  minLength: {
    value: 3,
    textError: LastnameValidErrors.MIN,
  },

  noEmpty: {
    value: true,
    textError: LastnameValidErrors.EMPTY,
  },

  maxLength: {
    value: 18,
    textError: LastnameValidErrors.MAX,
  },
});
