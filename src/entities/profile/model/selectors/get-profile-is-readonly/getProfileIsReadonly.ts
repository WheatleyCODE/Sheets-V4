import { IStateSchema } from '@/app/providers/store-provider';

export const getProfileIsReadonly = (state: IStateSchema) => state?.profile?.isReadonly || false;
