import { getValidator } from '../get-validator/getValidator';

export const nameValidator = getValidator({
  minLength: {
    value: 3,
    textError: 'Имя должно быть больше 3 символов',
  },

  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },

  maxLength: {
    value: 14,
    textError: 'Имя должно быть меньше 14 символов',
  },
});
