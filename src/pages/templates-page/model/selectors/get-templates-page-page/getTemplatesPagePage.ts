import { IStateSchema } from '@/app/providers/store-provider';
import { INIT_PAGE_COUNT } from '../../consts/templatesPage.consts';

export const getTemplatesPagePage = (state: IStateSchema) => state.templatesPage?.page || INIT_PAGE_COUNT;
