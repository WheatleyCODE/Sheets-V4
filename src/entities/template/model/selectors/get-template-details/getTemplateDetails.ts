import { IStateSchema } from 'app/providers/store-provider';
import { ITemplate } from '../../types/template';

export const initTemplate: ITemplate = {
  id: '',
  title: '',
  subtitle: '',
  image: '',
  views: 0,
  createdAt: '',
  tags: [],
  blocks: [],
  template: {},
};

export const getTemplateDetails = (state: IStateSchema) => state?.templateDetails?.template || initTemplate;
