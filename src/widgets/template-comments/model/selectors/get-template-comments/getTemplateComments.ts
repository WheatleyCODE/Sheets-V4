import { IStateSchema } from '@/app/providers/store-provider';
import { commentsAdapter } from '../../slice/templateCommentsSlice';
import { buildSelector } from '@/shared/lib/store';

export const selectorsTemplateComments = commentsAdapter.getSelectors<IStateSchema>(
  (state) => state.templateComments || commentsAdapter.getInitialState(),
);

export const [useTemplateCommentsSelectAll, getTemplateCommentsSelectAll] = buildSelector(
  selectorsTemplateComments.selectAll,
);
