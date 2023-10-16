import { TemplateTags } from '../types/template';

export interface ITemplateTab {
  text: string;
  value: TemplateTags;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const templateTabs: ITemplateTab[] = Object.entries(TemplateTags).map(([_, value]) => ({
  text: value,
  value,
}));
