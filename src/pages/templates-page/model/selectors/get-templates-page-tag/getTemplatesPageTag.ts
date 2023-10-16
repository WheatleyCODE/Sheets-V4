import { IStateSchema } from 'app/providers/store-provider';
import { TemplateTags } from 'entities/template';

export const getTemplatesPageTag = (state: IStateSchema) => state.templatesPage?.tag || TemplateTags.ALL;
