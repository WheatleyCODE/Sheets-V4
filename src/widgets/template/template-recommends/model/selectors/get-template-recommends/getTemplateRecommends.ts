import { IStateSchema } from '@/app/providers/store-provider';
import { recommendsAdapter } from '../../slice/templateRecommendsSlice';
import { buildSelector } from '@/shared/lib/store';

export const selectorsTemplateRecommends = recommendsAdapter.getSelectors<IStateSchema>(
  (state) => state.templateRecommends || recommendsAdapter.getInitialState(),
);

export const [useTemplateRecommendsSelectAll, getTemplateRecommendsSelectAll] = buildSelector(
  selectorsTemplateRecommends.selectAll,
);
