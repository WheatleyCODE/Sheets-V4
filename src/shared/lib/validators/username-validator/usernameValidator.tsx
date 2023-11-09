import { getValidator } from '../get-validator/getValidator';
import { UsernameValidErrors } from './usernameValidator.consts';

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
