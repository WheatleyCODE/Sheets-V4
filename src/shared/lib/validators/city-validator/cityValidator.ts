import { getValidator } from '../get-validator/getValidator';
import { CityValidErrors } from './cityValidator.consts';

// ? Добавить проверку по типу "Должен быть один из списка" ?
export const cityValidator = getValidator({
  noEmpty: {
    value: true,
    textError: CityValidErrors.EMPTY,
  },
});
