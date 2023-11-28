import { IStateSchema } from '@/app/providers/store-provider';

// ! FIX сделать генератор дефолтных селекторов
export const getUserIsLoading = (state: IStateSchema) => state?.user?.isLoading || false;
