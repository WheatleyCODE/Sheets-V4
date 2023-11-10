import { IStateSchema } from '@/app/providers/store-provider';
import { recommendsAdapter } from '../../slice/templateRecommendsSlice';

export const getTemplateRecommends = recommendsAdapter.getSelectors<IStateSchema>(
  (state) => state.templateRecommends || recommendsAdapter.getInitialState(),
);
