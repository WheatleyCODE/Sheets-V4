import { getValidator } from '../get-validator/getValidator';

// ? Добавить проверку по типу "Должен быть один из списка" ?
export const countryValidator = getValidator({
  noEmpty: {
    value: true,
    textError: 'Поле не может быть пустым',
  },
});
