import { IStateSchema } from '@/app/providers/store-provider';
import { initTemplate } from '../../consts/template.consts';
import { buildSelector } from '@/shared/store';

export const [useTemplateDetails, getTemplateDetails] = buildSelector(
  (state: IStateSchema) => state?.templateDetails?.template || initTemplate,
);
