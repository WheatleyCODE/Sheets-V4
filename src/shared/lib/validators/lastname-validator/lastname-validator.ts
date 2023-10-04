import { getValidator } from '../get-validator/getValidator';

export const lastnameValidator = getValidator({
  minLength: {
    value: 3,
    textError: 'Фамилия должна быть больше 3 символов',
  },

  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },

  maxLength: {
    value: 18,
    textError: 'Фамилия должна быть меньше 18 символов',
  },
});
