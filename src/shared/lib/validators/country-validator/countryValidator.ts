import { getValidator } from '../get-validator/getValidator';
import { CountryValidErrors } from './countryValidator.consts';

// ? Добавить проверку по типу "Должен быть один из списка" ?
export const countryValidator = getValidator({
  noEmpty: {
    value: true,
    textError: CountryValidErrors.EMPTY,
  },
});
