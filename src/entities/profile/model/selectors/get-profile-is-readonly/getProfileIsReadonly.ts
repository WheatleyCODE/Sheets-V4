import { buildSelector } from '@/shared/lib/store';

export const [useProfileIsReadonly, getProfileIsReadonly] = buildSelector(
  (state) => state?.profile?.isReadonly || false,
);
