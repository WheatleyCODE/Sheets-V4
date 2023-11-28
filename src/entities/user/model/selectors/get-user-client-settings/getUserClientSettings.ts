import { buildSelector } from '@/shared/store';
import { IClientSettings } from '@/shared/types';

export const [useGetClientSettings, getClientSettings] = buildSelector((state) => state.user?.user?.clientSettings);

export const [useGetClientSettingsByKey, getClientSettingsByKey] = buildSelector(
  (state, key: keyof IClientSettings) => state.user?.user?.clientSettings?.[key],
);
