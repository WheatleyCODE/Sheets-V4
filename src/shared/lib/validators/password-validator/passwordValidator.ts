import { getValidator } from '../get-validator/getValidator';
import { PasswordValidErrors } from './passwordValidator.consts';

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
