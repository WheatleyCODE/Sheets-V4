export { TemplateDetails } from './ui/template-details/TemplateDetails';
export { TemplateBlockTypes, TemplateTags, TemplateView, templateTabs } from './model/consts/template.consts';
export type { ITemplate, TemplateBlock, ITemplateDetailsSchema, ITemplateTab } from './model/types/template.interface';
export {
  templateDetailsReducer,
  templateDetailsActions,
  useTemplateDetailsActions,
} from './model/slice/templateDetailsSlice';
export { fetchTemplateById, useFetchTemplateById } from './model/services/fetch-template-by-id/fetchTemplateById';
export { TemplateList } from './ui/template-list/TemplateList';
export { SQUARES_TEMPLATE_COUNT } from './model/consts/template.consts';

export { getTemplateDetails, useTemplateDetails } from './model/selectors/get-template-details/getTemplateDetails';
export {
  getTemplateDetailsError,
  useTemplateDetailsError,
} from './model/selectors/get-template-details-error/getTemplateDetailsError';
export {
  getTemplateDetailsIsLoading,
  useTemplateDetailsIsLoading,
} from './model/selectors/get-template-details-is-loading/getTemplateIsDetailsLoading';
