import type { ITemplateImageBlock } from '../../model/types/template.interface';

export interface ITemplateImageBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  block: ITemplateImageBlock;
}
