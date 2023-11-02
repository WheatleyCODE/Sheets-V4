import { FC } from 'react';
import { getTemplatesPageTemplates } from '../../../../model/selectors/get-templates-page-templates/getTemplatesPageTemplates';
import { getTemplatesPageIsLoading } from '../../../../model/selectors/get-templates-page-is-loading/getTemplatesPageIsLoading';
import { getTemplatesPageError } from '../../../../model/selectors/get-templates-page-error/getTemplatesPageError';
import { getTemplatesPageView } from '../../../../model/selectors/get-templates-page-templates-view/getTemplatesPageView';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplatesPageInfinityTemplateList.module.scss';
import { TemplateList } from 'entities/template';
import { useSelector } from 'react-redux';

interface ITemplatesPageInfinityTemplateListProps extends React.HTMLAttributes<HTMLDivElement> {
  loadNextPart: () => void;
}

export const TemplatesPageInfinityTemplateList: FC<ITemplatesPageInfinityTemplateListProps> = (props) => {
  const { className, loadNextPart, ...anotherProps } = props;
  const templates = useSelector(getTemplatesPageTemplates.selectAll);
  const isLoading = useSelector(getTemplatesPageIsLoading);
  const error = useSelector(getTemplatesPageError);
  const view = useSelector(getTemplatesPageView);

  return (
    <div
      {...anotherProps}
      data-testid="templatesPageInfinityTemplateList"
      className={classNames(styles.templates_page_infinity_template_list, {}, [className])}
    >
      <TemplateList onScrollEnd={loadNextPart} isLoading={isLoading} view={view} error={error} templates={templates} />
    </div>
  );
};
