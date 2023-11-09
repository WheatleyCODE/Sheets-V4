import { getValidator } from '../get-validator/getValidator';
import { EmailValidErrors } from './emailValidator.consts';

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
