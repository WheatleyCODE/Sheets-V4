import { TemplateView } from '../../model/consts/template.consts';
import type { ITemplate } from '../../model/types/template.interface';

export interface ITemplateListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  template: ITemplate;
  view: TemplateView;
  isOpenInNewWindow?: boolean;
}
