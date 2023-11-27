import { IStateSchema } from '@/app/providers/store-provider';
import { TemplateView } from '@/entities/template';
import { buildSelector } from '@/shared/store';

export const getTemplatesPageView = (state: IStateSchema) => state.templatesPage?.view || TemplateView.SQUARES;
export const [useGetTemplateById] = buildSelector((state, id: string) => state.templatesPage?.entities[id]);
