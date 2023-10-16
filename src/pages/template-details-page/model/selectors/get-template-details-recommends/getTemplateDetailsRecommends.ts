import { IStateSchema } from 'app/providers/store-provider';
import { recommendsAdapter } from '../../slice/templateDetailsRecommendsSlice';

export const getTemplateDetailsRecommends = recommendsAdapter.getSelectors<IStateSchema>(
  (state) => state.templateDetailsRecommends || recommendsAdapter.getInitialState(),
);
