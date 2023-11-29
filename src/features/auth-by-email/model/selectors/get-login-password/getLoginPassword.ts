import { buildSelector } from '@/shared/lib/store';

export const [useLoginPassword, getLoginPassword] = buildSelector((state) => state?.login?.password || '');
