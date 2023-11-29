import { initialLoginState } from '../../consts/authByEmail.consts';
import { buildSelector } from '@/shared/lib/store';

export const [useLoginState, getLoginState] = buildSelector((state) => state?.login || initialLoginState);
