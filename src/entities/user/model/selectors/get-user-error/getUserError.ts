import { IStateSchema } from '@/app/providers/store-provider';

export const getUserError = (state: IStateSchema) => state?.user?.error || null;
