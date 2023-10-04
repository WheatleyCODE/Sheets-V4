import { getValidator } from '../get-validator/getValidator';

export enum EmailValidErrors {
  INCORRECT = 'Некорректная почта',
  EMPTY = 'Поле не может быть пустым',
}

export const emailValidator = getValidator({
  email: {
    value: true,
    textError: EmailValidErrors.INCORRECT,
  },

  noEmpty: {
    value: true,
    textError: EmailValidErrors.EMPTY,
  },
});
