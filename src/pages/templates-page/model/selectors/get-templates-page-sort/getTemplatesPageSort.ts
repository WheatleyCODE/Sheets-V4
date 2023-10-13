import { IStateSchema } from 'app/providers/store-provider';
import { TemplateSortFields } from '../../types/templatesPage';

export const getTemplatesPageSort = (state: IStateSchema) => state.templatesPage?.sort || TemplateSortFields.VIEWS;
