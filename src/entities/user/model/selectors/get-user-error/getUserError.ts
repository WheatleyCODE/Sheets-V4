import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useUserError, getUserError] = buildSelector(getDefaultSelectorBy('user', 'error', null));
