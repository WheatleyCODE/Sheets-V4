import { getValidator } from '../get-validator/getValidator';
import { AvatarValidErrors } from './avatarValidator.consts';

export const avatarValidator = getValidator({
  noEmpty: {
    value: true,
    textError: AvatarValidErrors.EMPTY,
  },
});
