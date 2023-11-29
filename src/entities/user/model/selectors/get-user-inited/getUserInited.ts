import { IStateSchema } from '@/app/providers/store-provider';
import { buildSelector } from '@/shared/lib/store';

export const [useUserInited, getUserInited] = buildSelector((state: IStateSchema) => state.user?._inited || false);
