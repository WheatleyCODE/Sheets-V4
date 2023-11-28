import { buildSelector } from '@/shared/lib/store';

export const [useUser, getUser] = buildSelector((state) => state?.user?.user);
