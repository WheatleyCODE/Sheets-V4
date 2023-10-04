import { getValidator } from '../get-validator/getValidator';

export enum UsernameValidErrors {
  MIN = 'Никнейм должен быть больше 3 символов',
  MAX = 'Никнейм должен быть меньше 14 символов',
  EMPTY = 'Поле не может быть пустым',
}

export const usernameValidator = getValidator({
  minLength: {
    value: 3,
    textError: UsernameValidErrors.MIN,
  },

  noEmpty: {
    value: true,
    textError: UsernameValidErrors.EMPTY,
  },

  maxLength: {
    value: 14,
    textError: UsernameValidErrors.MAX,
  },
});
