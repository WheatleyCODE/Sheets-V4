export type Validator = (str: string) => string | null;

export interface IValidatorOptions {
  noEmpty?: {
    value: boolean;
    textError: string;
  };

  minLength?: {
    value: number;
    textError: string;
  };

  maxLength?: {
    value: number;
    textError: string;
  };

  email?: {
    value: boolean;
    textError: string;
  };
}
