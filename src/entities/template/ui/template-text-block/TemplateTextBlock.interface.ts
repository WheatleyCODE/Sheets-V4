import type { ITemplateTextBlock } from '../../model/types/template.interface';

export interface ITemplateTextBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  block: ITemplateTextBlock;
}
