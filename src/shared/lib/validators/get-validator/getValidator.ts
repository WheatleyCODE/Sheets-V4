import { IValidatorOptions, Validator } from '../interface';

const re =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getValidator = (options: IValidatorOptions): Validator => {
  const { email, noEmpty, minLength, maxLength, maxNumber, minNumber } = options;

  const validators: Record<keyof IValidatorOptions, Validator> = {
    noEmpty: (str) => {
      return noEmpty && str.length < 1 ? noEmpty.textError : null;
    },
    email: (str) => {
      return email && !re.test(String(str).toLowerCase()) ? email.textError : null;
    },
    minLength: (str) => {
      return minLength && str.length < minLength.value ? minLength.textError : null;
    },
    maxLength: (str) => {
      return maxLength && str.length > maxLength.value ? maxLength.textError : null;
    },
    maxNumber: (str) => {
      const number = Number(str);
      if (Number.isNaN(number) && maxNumber) return maxNumber.notNumberError;
      return maxNumber && number > maxNumber.value ? maxNumber.textError : null;
    },
    minNumber: (str) => {
      const number = Number(str);
      if (Number.isNaN(number) && minNumber) return minNumber.notNumberError;
      return minNumber && number < minNumber.value ? minNumber.textError : null;
    },
  };

  return (str: string) => {
    for (const key of Object.keys(validators) as Array<keyof IValidatorOptions>) {
      if (options[key]?.value) {
        const error = validators[key](str);
        if (error) return error;
      }
    }

    return null;
  };
};
