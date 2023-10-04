import { getValidator } from '../get-validator/getValidator';

export const ageValidator = getValidator({
  minNumber: {
    value: 18,
    textError: 'Возраст должен быть больше 18 лет',
    notNumberError: 'Значение должно быть числом',
  },

  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },

  maxNumber: {
    value: 85,
    textError: 'Возраст должен быть меньше 85 лет',
    notNumberError: 'Значение должно быть числом',
  },
});
