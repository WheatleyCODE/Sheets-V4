import { IStateSchema } from '@/app/providers/store-provider';
import { TemplateView } from '@/entities/template';

export const getTemplatesPageView = (state: IStateSchema) => state.templatesPage?.view || TemplateView.SQUARES;
