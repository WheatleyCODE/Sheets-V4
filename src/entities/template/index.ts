export { TemplateDetails } from './ui/template-details/TemplateDetails';
export { TemplateBlockTypes, TemplateTags, TemplateView, templateTabs } from './model/consts/template.consts';
export type { ITemplate, TemplateBlock, ITemplateDetailsSchema, ITemplateTab } from './model/types/template.interface';
export { templateDetailsReducer, templateDetailsActions } from './model/slice/templateDetailsSlice';
export { fetchTemplateById } from './model/services/fetch-template-by-id/fetchTemplateById';
export { getTemplateDetails } from './model/selectors/get-template-details/getTemplateDetails';
export { getTemplateDetailsError } from './model/selectors/get-template-details-error/getTemplateDetailsError';
export { getTemplateDetailsIsLoading } from './model/selectors/get-template-details-is-loading/getTemplateIsDetailsLoading';
export { TemplateList } from './ui/template-list/TemplateList';
