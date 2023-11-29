import { buildSelector } from '@/shared/lib/store';

export const [useLoginEmail, getLoginEmail] = buildSelector((state) => state?.login?.email || '');
