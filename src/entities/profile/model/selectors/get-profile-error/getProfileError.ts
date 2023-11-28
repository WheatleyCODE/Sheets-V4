import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useProfileError, getProfileError] = buildSelector(getDefaultSelectorBy('profile', 'error', null));
