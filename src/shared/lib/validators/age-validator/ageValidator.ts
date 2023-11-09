import { getValidator } from '../get-validator/getValidator';
import { AgeValidErrors } from './ageValidator.consts';

export const ageValidator = getValidator({
  minNumber: {
    value: 18,
    textError: AgeValidErrors.MIN,
    notNumberError: AgeValidErrors.TYPE,
  },

  noEmpty: {
    value: true,
    textError: AgeValidErrors.EMPTY,
  },

  maxNumber: {
    value: 85,
    textError: AgeValidErrors.MAX,
    notNumberError: AgeValidErrors.TYPE,
  },
});
