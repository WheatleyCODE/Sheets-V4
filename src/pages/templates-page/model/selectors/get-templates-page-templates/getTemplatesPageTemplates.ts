/* eslint-disable @typescript-eslint/no-unused-vars */
import { IStateSchema } from '@/app/providers/store-provider';
import { templatesPageAdapter } from '../../slice/templatesPageSlice';
import { buildSelector } from '@/shared/lib/store';

export const selectorsTemplatesPageTemplates = templatesPageAdapter.getSelectors<IStateSchema>(
  (state) => state.templatesPage || templatesPageAdapter.getInitialState(),
);

export const [useTemplatesPageTemplatesSelectAll, getTemplatesPageTemplatesSelectAll] = buildSelector(
  selectorsTemplatesPageTemplates.selectAll,
);
