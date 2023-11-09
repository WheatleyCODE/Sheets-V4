import { IStateSchema } from 'app/providers/store-provider';
import { TemplateSortFields } from '../../consts/templatesPage.consts';

export const getTemplatesPageSort = (state: IStateSchema) => state.templatesPage?.sort || TemplateSortFields.VIEWS;
