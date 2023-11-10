import { IStateSchema } from '@/app/providers/store-provider';
import { initialLoginState } from '../../consts/authByEmail.consts';

export const getLoginState = (state: IStateSchema) => state?.login || initialLoginState;
