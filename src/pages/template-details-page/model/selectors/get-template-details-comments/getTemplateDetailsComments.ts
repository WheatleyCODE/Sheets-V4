import { IStateSchema } from 'app/providers/store-provider';
import { commentsAdapter } from '../../slice/templateDetailsCommentsSlice';

export const getTemplateDetailsComments = commentsAdapter.getSelectors<IStateSchema>(
  (state) => state.templateDetailsComments || commentsAdapter.getInitialState(),
);
