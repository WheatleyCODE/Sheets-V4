import type { ITemplate, ITemplateDetailsSchema, ITemplateTab } from '../types/template.interface';

export enum TemplateBlockTypes {
  TEXT = 'TEXT',
  CODE = 'CODE',
  IMAGE = 'IMAGE',
}

export enum TemplateTags {
  ALL = 'All_templates',
  IT = 'IT',
  INVEST = 'Invest',
  SINCE = 'Since',
  NATURE = 'Nature',
  BUSINESS = 'Business',
  ACCOUNTING = 'Accounting',
  EXPENSES = 'Expenses',
  CALCULATIONS = 'Calculations',
  AI = 'AI',
  JS = 'JavaScript',
  TS = 'TypeScript',
}

export enum TemplateView {
  SQUARES = 'squares',
  LINES = 'lines',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const templateTabs: ITemplateTab[] = Object.entries(TemplateTags).map(([_, value]) => ({
  text: value,
  value,
}));

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

export const initialTemplateDetailsState: ITemplateDetailsSchema = {
  isLoading: false,
  error: null,
};

export const LIST_ITEM_MARGINS = 20;
export const LIST_ITEM_SQUARES_HEIGHT = 315;
export const LIST_ITEM_SQUARES_WIDTH = 380;
export const LIST_ITEM_LINES_HEIGHT = 400;
export const SQUARES_TEMPLATE_COUNT = 12;
export const LINES_TEMPLATE_COUNT = 4;
