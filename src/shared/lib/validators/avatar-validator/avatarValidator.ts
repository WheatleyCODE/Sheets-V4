import { getValidator } from '../get-validator/getValidator';

export const avatarValidator = getValidator({
  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },
});
