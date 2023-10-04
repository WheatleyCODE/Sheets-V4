import { getValidator } from '../get-validator/getValidator';

export enum PasswordValidErrors {
  MIN = 'Пароль должен быть больше 8 символов',
  MAX = 'Пароль должен быть меньше 12 символов',
  EMPTY = 'Поле не может быть пустым',
}

export const passwordValidator = getValidator({
  minLength: {
    value: 8,
    textError: PasswordValidErrors.MIN,
  },

  noEmpty: {
    value: true,
    textError: PasswordValidErrors.EMPTY,
  },

  maxLength: {
    value: 12,
    textError: PasswordValidErrors.MAX,
  },
});
