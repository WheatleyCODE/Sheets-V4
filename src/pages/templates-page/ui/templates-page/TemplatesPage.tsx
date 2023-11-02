import { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from 'widgets/layout';
import { templatesPageReducer } from '../../model/slice/templatesPageSlice';
import { fetchTemplatesPageNextTemplates } from '../../model/services/fetch-templates-page-next-templates/fetchTemplatesPageNextTemplates';
import { initTemplatesPage } from '../../model/services/init-templates-page/initTemplatesPage';
import { TemplatesPageFilters } from '../templates-page-filters/TemplatesPageFilters';
import { ReducersList, useDynamicModule, useInitialEffect, useTypedDispatch } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplatesPage.module.scss';
import { TemplatesPageInfinityTemplateList } from '../templates-page-infinity-template-list/ui/templates-page-infinity-template-list/TemplatesPageInfinityTemplateList';

interface ITemplatesPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const reducers: ReducersList = { templatesPage: templatesPageReducer };

const TemplatesPage: FC<ITemplatesPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers, false);
  const [searchParams] = useSearchParams();
  const dispatch = useTypedDispatch();

  useInitialEffect(() => {
    dispatch(initTemplatesPage(searchParams));
  });

  const loadNextPart = useCallback(() => {
    dispatch(fetchTemplatesPageNextTemplates());
  }, [dispatch]);

  return (
    <Layout onScrollEnd={loadNextPart}>
      <section
        {...anotherProps}
        data-testid="templatesPage"
        className={classNames(styles.templates_page, {}, [className, 'page'])}
      >
        <TemplatesPageFilters />
        <TemplatesPageInfinityTemplateList loadNextPart={loadNextPart} />
      </section>
    </Layout>
  );
});

export default TemplatesPage;
