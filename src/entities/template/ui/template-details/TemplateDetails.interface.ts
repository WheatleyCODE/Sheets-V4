import { ITemplate } from '../../model/types/template.interface';

export interface ITemplateDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  template: ITemplate;
  isLoading: boolean;
  error: string | null;
}
