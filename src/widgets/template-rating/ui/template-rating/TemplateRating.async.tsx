import { FC, lazy } from 'react';
import { withSuspense } from '@/shared/lib/with';
import type { ITemplateRatingProps } from './TemplateRating.interface';
import { CircleLoader } from '@/shared/ui/loaders';

const TemplateRatingAsync = lazy(() => import('./TemplateRating'));

export const TemplateRating: FC<ITemplateRatingProps> = withSuspense({ fallback: <CircleLoader /> })(
  TemplateRatingAsync,
);
