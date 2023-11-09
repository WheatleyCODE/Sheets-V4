import { getValidator } from '../get-validator/getValidator';
import { LastnameValidErrors } from './lastnameValidator.consts';

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
