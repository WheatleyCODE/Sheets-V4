import { IStateSchema } from '@/app/providers/store-provider';
import { templatesPageAdapter } from '../../slice/templatesPageSlice';

export const getTemplatesPageTemplates = templatesPageAdapter.getSelectors<IStateSchema>(
  (state) => state.templatesPage || templatesPageAdapter.getInitialState(),
);
