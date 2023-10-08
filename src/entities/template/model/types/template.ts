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
  IT = 'IT',
  INVEST = 'Invest',
}

export type TemplateBlock = ITemplateCodeBlock | ITemplateImageBlock | ITemplateTextBlock;

export interface ISheetsTemplate {}

export interface ITemplate {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  views: number;
  createdAt: string;
  tags: TemplateTags[];
  blocks: TemplateBlock[];
  template: ISheetsTemplate;
}

export interface ITemplateDetailsSchema {
  isLoading: boolean;
  error: string | null;
  template?: ITemplate;
}
