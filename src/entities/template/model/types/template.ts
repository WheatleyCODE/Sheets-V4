import { IUser } from 'entities/user';

export enum TemplateBlockTypes {
  TEXT = 'TEXT',
  CODE = 'CODE',
  IMAGE = 'IMAGE',
}

export interface ITemplateBaseBlock {
  id: string;
  type: TemplateBlockTypes;
}

export interface ITemplateCodeBlock extends ITemplateBaseBlock {
  type: TemplateBlockTypes.CODE;
  code: string;
}

export interface ITemplateTextBlock extends ITemplateBaseBlock {
  type: TemplateBlockTypes.TEXT;
  title?: string;
  paragraphs: string[];
}

export interface ITemplateImageBlock extends ITemplateBaseBlock {
  type: TemplateBlockTypes.IMAGE;
  src: string;
  title: string;
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

export type TemplateBlock = ITemplateCodeBlock | ITemplateImageBlock | ITemplateTextBlock;

export interface ISheetsTemplate {}

export interface ITemplate {
  id: string;
  title: string;
  user?: IUser;
  subtitle: string;
  image: string;
  views: number;
  createdAt: string;
  tags: TemplateTags[];
  blocks: TemplateBlock[];
  template: ISheetsTemplate;
}

export interface ITemplateDetailsSchema extends IReduxSchema {
  template?: ITemplate;
}

export enum TemplateView {
  SQUARES = 'squares',
  LINES = 'lines',
}
