import { IStateSchema } from 'app/providers/store-provider';

export const getUserRoles = (state: IStateSchema) => state.user?.user?.roles || [];
