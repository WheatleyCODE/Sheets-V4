import { buildSelector } from '@/shared/lib/store';

export const [useProfileLastname, getProfileLastname] = buildSelector(
  (state) => state?.profile?.profile?.lastname || '',
);
