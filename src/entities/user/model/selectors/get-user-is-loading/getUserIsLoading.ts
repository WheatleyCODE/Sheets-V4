import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useUserIsLoading, getUserIsLoading] = buildSelector(getDefaultSelectorBy('user', 'isLoading', false));
