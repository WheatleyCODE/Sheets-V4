import { IStateSchema } from 'app/providers/store-provider';

export const getUserInited = (state: IStateSchema) => state.user?._inited || false;
