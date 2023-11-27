import { IFeatureFlags } from '@/shared/types';

export interface IToggleFeaturesOptions<T> {
  name: keyof IFeatureFlags;
  on: () => T;
  off: () => T;
}
