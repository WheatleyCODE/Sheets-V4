import type { ITemplateCodeBlock } from '../../model/types/template.interface';

export interface ITemplateCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  block: ITemplateCodeBlock;
}
