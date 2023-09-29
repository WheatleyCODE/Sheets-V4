import { getValidator } from '../get-validator/getValidator';

export const emailValidator = getValidator({
  email: {
    value: true,
    textError: 'Некорректная почта',
  },

  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },
});
