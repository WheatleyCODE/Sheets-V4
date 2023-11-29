import { FC } from 'react';
import { useTemplatesPageTemplatesSelectAll } from '../../model/selectors/get-templates-page-templates/getTemplatesPageTemplates';
import { useTemplatesPageError } from '../../model/selectors/get-templates-page-error/getTemplatesPageError';
import { useTemplatesPageView } from '../../model/selectors/get-templates-page-templates-view/getTemplatesPageView';
import { useTemplatesPageIsLoading } from '../../model/selectors/get-templates-page-is-loading/getTemplatesPageIsLoading';
import { TemplateList } from '@/entities/template';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplatesPageInfinityTemplateListProps } from './TemplatesPageInfinityTemplateList.interface';
import styles from './TemplatesPageInfinityTemplateList.module.scss';

export const TemplatesPageInfinityTemplateList: FC<ITemplatesPageInfinityTemplateListProps> = (props) => {
  const { className, loadNextPart, ...anotherProps } = props;
  const templates = useTemplatesPageTemplatesSelectAll();
  const isLoading = useTemplatesPageIsLoading();
  const error = useTemplatesPageError();
  const view = useTemplatesPageView();

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
