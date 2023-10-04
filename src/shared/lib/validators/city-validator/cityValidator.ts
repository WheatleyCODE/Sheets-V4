import { getValidator } from '../get-validator/getValidator';

export enum CityValidErrors {
  EMPTY = 'Поле не может быть пустым',
}

// ? Добавить проверку по типу "Должен быть один из списка" ?
export const cityValidator = getValidator({
  noEmpty: {
    value: true,
    textError: CityValidErrors.EMPTY,
  },
});
