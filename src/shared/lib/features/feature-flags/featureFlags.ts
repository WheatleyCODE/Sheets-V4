import { IFeatureFlags } from '@/shared/types';
import { KVFactory, SessionStorageEngine } from '../../kv-storage';
import { SS_DEFAULT_NAMESPACE, SS_FEATURES_KEY } from '@/shared/consts';
import { Nullable } from '../../ts-utils';

const ss = KVFactory(SS_DEFAULT_NAMESPACE, new SessionStorageEngine());

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
