import { buildSelector } from '@/shared/lib/store';

export const [useUserRoles, getUserRoles] = buildSelector((state) => state.user?.user?.roles || []);
