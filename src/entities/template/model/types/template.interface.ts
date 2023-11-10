import { IUser } from '@/features/user';
import { TemplateBlockTypes, TemplateTags } from '../consts/template.consts';

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

export interface ITemplateTab {
  text: string;
  value: TemplateTags;
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
