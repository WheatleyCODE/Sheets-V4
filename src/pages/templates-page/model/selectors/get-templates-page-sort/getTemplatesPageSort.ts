import { TemplateSortFields } from '../../consts/templatesPage.consts';
import { buildSelector } from '@/shared/lib/store';

export const [useTemplatesPageSort, getTemplatesPageSort] = buildSelector(
  (state) => state.templatesPage?.sort || TemplateSortFields.VIEWS,
);
