import { IStateSchema } from '@/app/providers/store-provider';
import { commentsAdapter } from '../../slice/templateCommentsSlice';

export const getTemplateComments = commentsAdapter.getSelectors<IStateSchema>(
  (state) => state.templateComments || commentsAdapter.getInitialState(),
);
