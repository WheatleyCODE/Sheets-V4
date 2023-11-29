import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useLoginIsLoading, getLoginIsLoading] = buildSelector(getDefaultSelectorBy('login', 'isLoading', false));
