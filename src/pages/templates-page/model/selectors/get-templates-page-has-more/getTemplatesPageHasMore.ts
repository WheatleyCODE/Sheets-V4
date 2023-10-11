import { IStateSchema } from 'app/providers/store-provider';

export const getTemplatesPageHasMore = (state: IStateSchema) => state.templatesPage?.hasMore || false;
