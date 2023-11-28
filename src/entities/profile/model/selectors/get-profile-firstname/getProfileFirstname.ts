import { buildSelector } from '@/shared/lib/store';

export const [useProfileFirstName, getProfileFirstname] = buildSelector(
  (state) => state?.profile?.profile?.firstname || '',
);
