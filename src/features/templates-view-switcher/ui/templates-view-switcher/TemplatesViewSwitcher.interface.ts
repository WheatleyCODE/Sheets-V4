import { TemplateView } from '@/entities/template';

export interface ITemplatesViewSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  view: TemplateView;
  changeView: (view: TemplateView) => void;
}
