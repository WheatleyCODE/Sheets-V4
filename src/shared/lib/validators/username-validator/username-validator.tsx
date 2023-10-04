import { getValidator } from '../get-validator/getValidator';

export const usernameValidator = getValidator({
  minLength: {
    value: 3,
    textError: 'Никнейм должен быть больше 3 символов',
  },

  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },

  maxLength: {
    value: 14,
    textError: 'Никнейм должен быть меньше 14 символов',
  },
});
