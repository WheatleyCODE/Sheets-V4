import { IStateSchema } from 'app/providers/store-provider';
import { SQUARES_TEMPLATE_COUNT } from 'entities/template/model/consts/template.consts';

export const getTemplatesPageLimit = (state: IStateSchema) => state.templatesPage?.limit || SQUARES_TEMPLATE_COUNT;
