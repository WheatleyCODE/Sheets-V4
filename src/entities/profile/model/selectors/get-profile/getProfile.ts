import { IStateSchema } from 'app/providers/store-provider';
import { initProfile } from '../../consts/profile.consts';

export const getProfile = (state: IStateSchema) => state?.profile?.profile || initProfile;
