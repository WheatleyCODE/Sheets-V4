import { getValidator } from '../get-validator/getValidator';

export enum AvatarValidErrors {
  EMPTY = 'Поле не может быть пустым',
}

export const avatarValidator = getValidator({
  noEmpty: {
    value: true,
    textError: AvatarValidErrors.EMPTY,
  },
});
