import { getFeatureFlags } from '../feature-flags/featureFlags';
import type { IToggleFeaturesOptions } from './toggleFeatures.interface';

export function toggleFeatures<T>({ off, on, name }: IToggleFeaturesOptions<T>): T {
  const flags = getFeatureFlags();

  if (flags && flags[name]) {
    return on();
  }

  return off();
}
