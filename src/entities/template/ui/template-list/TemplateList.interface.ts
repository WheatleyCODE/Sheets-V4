import { TemplateView } from '../../model/consts/template.consts';
import { ITemplate } from '../../model/types/template.interface';

export interface ITemplateListProps extends React.HTMLAttributes<HTMLDivElement> {
  templates: ITemplate[];
  isLoading?: boolean;
  error?: string | null;
  view?: TemplateView;
  isOpenInNewWindow?: boolean;
  onScrollEnd?: () => void;
}
