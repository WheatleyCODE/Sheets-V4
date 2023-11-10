import { IStateSchema } from '@/app/providers/store-provider';
import { initTemplate } from '../../consts/template.consts';

export const getTemplateDetails = (state: IStateSchema) => state?.templateDetails?.template || initTemplate;
