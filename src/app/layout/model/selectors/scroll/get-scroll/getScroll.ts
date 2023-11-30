import { IStateSchema } from '@/app/providers/store-provider';

export const getScroll = (state: IStateSchema) => state.scroll.scroll;
