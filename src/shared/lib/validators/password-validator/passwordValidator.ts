import { getValidator } from '../get-validator/getValidator';

export const passwordValidator = getValidator({
  minLength: {
    value: 8,
    textError: 'Пароль должен быть больше 8 символов',
  },

  maxLength: {
    value: 12,
    textError: 'Пароль должен быть меньше 12 символов',
  },

  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },
});
