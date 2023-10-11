import { FC, memo, useCallback } from 'react';
import { TemplateList, TemplateView } from 'entities/template';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDynamicModule, useInitialEffect, useTypedDispatch } from 'shared/lib/hooks';
import { templatesPageActions, templatesPageReducer } from '../../model/slice/templatesPageSlice';
import { TemplatesViewSwitcher } from 'features/templates-view-switcher';
import { fetchTemplatesPageTemplates } from '../../model/services/fetch-templates-page-templates/fetchTemplatesPageTemplates';
import { getTemplatesPageTemplates } from '../../model/selectors/get-templates-page-templates/getTemplatesPageTemplates';
import { getTemplatesPageIsLoading } from '../../model/selectors/get-templates-page-is-loading/getTemplatesPageIsLoading';
import { getTemplatesPageError } from '../../model/selectors/get-templates-page-error/getTemplatesPageError';
import { getTemplatesPageView } from '../../model/selectors/get-templates-page-templates-view/getTemplatesPageView';
import { Layout } from 'widgets/layout';
import { getTemplatesPagePage } from '../../model/selectors/get-templates-page-page/getTemplatesPagePage';
import { getTemplatesPageHasMore } from '../../model/selectors/get-templates-page-has-more/getTemplatesPageHasMore';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplatesPage.module.scss';
interface ITemplatesPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const TemplatesPage: FC<ITemplatesPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule({ templatesPage: templatesPageReducer });
  const templates = useSelector(getTemplatesPageTemplates.selectAll);
  const isLoading = useSelector(getTemplatesPageIsLoading);
  const error = useSelector(getTemplatesPageError);
  const view = useSelector(getTemplatesPageView);
  const page = useSelector(getTemplatesPagePage);
  const hasMore = useSelector(getTemplatesPageHasMore);

  const dispatch = useTypedDispatch();
  const { t } = useTranslation('templates');

  useInitialEffect(() => {
    dispatch(templatesPageActions.initState());

    dispatch(fetchTemplatesPageTemplates());
  });

  const changeView = useCallback(
    (view: TemplateView) => {
      dispatch(templatesPageActions.setView(view));
    },
    [dispatch],
  );

  const loadNextPart = useCallback(() => {
    if (hasMore && !isLoading) {
      dispatch(templatesPageActions.setPage(page + 1));
      dispatch(fetchTemplatesPageTemplates());
    }
  }, [dispatch, page, hasMore, isLoading]);

  return (
    <Layout onScrollEnd={loadNextPart}>
      <div
        {...anotherProps}
        data-testid="templatesPage"
        className={classNames(styles.templates_page, {}, [className, 'page'])}
      >
        <div className={styles.width}>
          <TemplatesViewSwitcher changeView={changeView} view={view} />
        </div>
        <TemplateList isLoading={isLoading} view={view} error={error} templates={templates} />
      </div>
    </Layout>
  );
});

export default TemplatesPage;
