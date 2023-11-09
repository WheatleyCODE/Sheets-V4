import { getValidator } from '../get-validator/getValidator';
import { FirstnameValidErrors } from './firstnameValidator.consts';

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
