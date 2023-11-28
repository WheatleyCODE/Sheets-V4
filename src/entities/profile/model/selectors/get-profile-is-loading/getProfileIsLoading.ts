import { buildSelector, getDefaultSelectorBy } from '@/shared/lib/store';

export const [useProfileIsLoading, getProfileIsLoading] = buildSelector(
  getDefaultSelectorBy('profile', 'isLoading', false),
);
