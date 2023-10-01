import { IStateSchema } from 'app/providers/store-provider';
import { ILoginSchema } from '../../types/login';

const initState: ILoginSchema = {
  password: '',
  email: '',
  error: null,
  isLoading: false,
};

export const getLoginState = (state: IStateSchema) => state?.login || initState;
