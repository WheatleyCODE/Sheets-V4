export { TemplateDetails } from './ui/template-details/TemplateDetails';
export {
  ITemplate,
  TemplateBlock,
  TemplateTags,
  TemplateBlockTypes,
  ITemplateDetailsSchema,
} from './model/types/template';

export { templateDetailsReducer, templateDetailsActions } from './model/slice/templateDetailsSlice';
export { fetchTemplateById } from './model/services/fetch-template-by-id/fetchTemplateById';
export { getTemplateDetails } from './model/selectors/get-template-details/getTemplateDetails';
export { getTemplateDetailsError } from './model/selectors/get-template-details-error/getTemplateDetailsError';
export { getTemplateDetailsIsLoading } from './model/selectors/get-template-details-is-loading/getTemplateIsDetailsLoading';