import { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { templatesPageReducer } from '../../model/slice/templatesPageSlice';
import { useFetchTemplatesPageNextTemplates } from '../../model/services/fetch-templates-page-next-templates/fetchTemplatesPageNextTemplates';
import { useInitTemplatesPage } from '../../model/services/init-templates-page/initTemplatesPage';
import { TemplatesPageFilters } from '../templates-page-filters/TemplatesPageFilters';
import { TemplatesPageInfinityTemplateList } from '../templates-page-infinity-template-list/TemplatesPageInfinityTemplateList';
import { ReducersList, useDynamicModule, useInitialEffect } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplatesPageProps } from './TemplatesPage.interface';
import styles from './TemplatesPage.module.scss';

const reducers: ReducersList = { templatesPage: templatesPageReducer };

const TemplatesPage: FC<ITemplatesPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers, false);

  const fetchTemplatesPageNextTemplates = useFetchTemplatesPageNextTemplates();
  const initTemplatesPage = useInitTemplatesPage();
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    initTemplatesPage(searchParams);
  });

  const loadNextPart = useCallback(() => {
    fetchTemplatesPageNextTemplates();
  }, [fetchTemplatesPageNextTemplates]);

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
