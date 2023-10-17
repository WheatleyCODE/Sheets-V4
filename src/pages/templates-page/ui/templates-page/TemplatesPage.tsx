import { FC, memo, useCallback } from 'react';
import { TemplateList, TemplateTags, TemplateView } from 'entities/template';
// import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDebounce, useDynamicModule, useInitialEffect, useTypedDispatch } from 'shared/lib/hooks';
import { templatesPageActions, templatesPageReducer } from '../../model/slice/templatesPageSlice';
import { fetchTemplatesPageNextTemplates } from '../../model/services/fetch-templates-page-next-templates/fetchTemplatesPageNextTemplates';
import { getTemplatesPageTemplates } from '../../model/selectors/get-templates-page-templates/getTemplatesPageTemplates';
import { getTemplatesPageIsLoading } from '../../model/selectors/get-templates-page-is-loading/getTemplatesPageIsLoading';
import { getTemplatesPageError } from '../../model/selectors/get-templates-page-error/getTemplatesPageError';
import { getTemplatesPageView } from '../../model/selectors/get-templates-page-templates-view/getTemplatesPageView';
import { Layout } from 'widgets/layout';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplatesPage.module.scss';
import { initTemplatesPage } from '../../model/services/init-templates-page/initTemplatesPage';
import { TemplatesPageFilters } from '../templates-page-filters/TemplatesPageFilters';
import { getTemplatesPageSort } from '../../model/selectors/get-templates-page-sort/getTemplatesPageSort';
import { getTemplatesPageSortOrder } from '../../model/selectors/get-templates-page-sort-order/getTemplatesPageSortOrder';
import { getTemplatesPageSearch } from '../../model/selectors/get-templates-page-search/getTemplatesPageSearch';
import { TemplateSortOrders, TemplateSortFields } from '../../model/types/templatesPage';
import { fetchTemplatesPageTemplates } from '../../model/services/fetch-templates-page-templates/fetchTemplatesPageTemplates';
import { useSearchParams } from 'react-router-dom';
import { getTemplatesPageTag } from 'pages/templates-page/model/selectors/get-templates-page-tag/getTemplatesPageTag';

interface ITemplatesPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const TemplatesPage: FC<ITemplatesPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule({ templatesPage: templatesPageReducer }, false);
  const templates = useSelector(getTemplatesPageTemplates.selectAll);
  const isLoading = useSelector(getTemplatesPageIsLoading);
  const error = useSelector(getTemplatesPageError);
  const view = useSelector(getTemplatesPageView);
  const sort = useSelector(getTemplatesPageSort);
  const sortOrder = useSelector(getTemplatesPageSortOrder);
  const search = useSelector(getTemplatesPageSearch);
  const tag = useSelector(getTemplatesPageTag);
  const [searchParams] = useSearchParams();
  const dispatch = useTypedDispatch();
  // const { t } = useTranslation('templates');

  useInitialEffect(() => {
    dispatch(initTemplatesPage(searchParams));
  });

  const fetchTemplatesOnChange = useCallback(() => {
    dispatch(templatesPageActions.setPage(1));
    dispatch(fetchTemplatesPageTemplates({ isReplace: true }));
  }, [dispatch]);

  const loadNextPart = useCallback(() => {
    dispatch(fetchTemplatesPageNextTemplates());
  }, [dispatch]);

  const changeView = useCallback(
    (view: TemplateView) => {
      dispatch(templatesPageActions.setView(view));
    },
    [dispatch],
  );

  const changeSort = useCallback(
    (sort: TemplateSortFields) => {
      dispatch(templatesPageActions.setSort(sort));
      fetchTemplatesOnChange();
    },
    [dispatch, fetchTemplatesOnChange],
  );

  const changeSortOrder = useCallback(
    (sortOrder: TemplateSortOrders) => {
      dispatch(templatesPageActions.setSortOrder(sortOrder));
      fetchTemplatesOnChange();
    },
    [dispatch, fetchTemplatesOnChange],
  );

  const changeTag = useCallback(
    (tag: TemplateTags) => {
      dispatch(templatesPageActions.setTags(tag));
      fetchTemplatesOnChange();
    },
    [dispatch, fetchTemplatesOnChange],
  );

  const changeSearch = useDebounce((search: string) => {
    dispatch(templatesPageActions.setSearch(search));
    fetchTemplatesOnChange();
  }, 300);

  return (
    <Layout onScrollEnd={loadNextPart}>
      <section
        {...anotherProps}
        data-testid="templatesPage"
        className={classNames(styles.templates_page, {}, [className, 'page'])}
      >
        <TemplatesPageFilters
          view={view}
          changeView={changeView}
          sort={sort}
          changeSort={changeSort}
          sortOrder={sortOrder}
          changeSortOrder={changeSortOrder}
          search={search}
          changeSearch={changeSearch}
          tag={tag}
          changeTag={changeTag}
        />

        <TemplateList
          onScrollEnd={loadNextPart}
          isLoading={isLoading}
          view={view}
          error={error}
          templates={templates}
        />
      </section>
    </Layout>
  );
});

export default TemplatesPage;
