import { ReactElement } from 'react';
import { IFeatureFlags } from '@/shared/types';

export interface ToggleFeaturesProps {
  name: keyof IFeatureFlags;
  on: ReactElement;
  off: ReactElement;
}
