import type { ILoginSchema } from '../types/login.interface';

export const initialLoginState: ILoginSchema = {
  password: '',
  email: '',
  error: null,
  isLoading: false,
};
