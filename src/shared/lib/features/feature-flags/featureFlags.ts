import { IFeatureFlags } from '@/shared/types';
import { KVFactory, SessionStorageSyncEngine } from '../../kv-storage';
import { STORAGE_NAMESPACE, SS_FEATURES_KEY } from '@/shared/consts';
import { Nullable } from '../../ts-utils';

const ss = KVFactory(STORAGE_NAMESPACE, new SessionStorageSyncEngine());

export const setFeatureFlags = (flags: IFeatureFlags) => {
  // * Sync
  ss.set(SS_FEATURES_KEY, flags);
};

export const getFeatureFlags = (): Nullable<IFeatureFlags> => {
  let result: Nullable<IFeatureFlags> = null;

  // * Sync
  ss.get<IFeatureFlags>(SS_FEATURES_KEY).then((flags) => (result = flags));

  return result;
};
