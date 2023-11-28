import { getFeatureFlags } from '../feature-flags/featureFlags';
import type { ToggleFeaturesProps } from './ToggleFeatures.interface';

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
  const { on, off, name } = props;

  const flags = getFeatureFlags();

  if (flags && flags[name]) {
    return on;
  }

  return off;
};
