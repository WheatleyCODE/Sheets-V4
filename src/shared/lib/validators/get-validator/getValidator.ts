import { IValidatorOptions, Validator } from '../interface';

const re =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getValidator = (options: IValidatorOptions): Validator => {
  const { email, noEmpty, minLength, maxLength } = options;

  const validators: Record<keyof IValidatorOptions, Validator> = {
    noEmpty: (str: string) => {
      return noEmpty && str.length < 1 ? noEmpty.textError : null;
    },
    email: (str: string) => {
      return email && !re.test(String(str).toLowerCase()) ? email.textError : null;
    },
    minLength: (str: string) => {
      return minLength && str.length < minLength.value ? minLength.textError : null;
    },
    maxLength: (str: string) => {
      return maxLength && str.length > maxLength.value ? maxLength.textError : null;
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
