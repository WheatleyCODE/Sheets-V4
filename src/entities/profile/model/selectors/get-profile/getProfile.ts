import { buildSelector } from '@/shared/lib/store';
import { initProfile } from '../../consts/profile.consts';

export const [useProfile, getProfile] = buildSelector((state) => state?.profile?.profile || initProfile);
