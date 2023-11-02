import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  TemplateDetails,
  fetchTemplateById,
  getTemplateDetails,
  getTemplateDetailsError,
  getTemplateDetailsIsLoading,
  templateDetailsActions,
  templateDetailsReducer,
} from 'entities/template';
import { useDynamicModule, useTypedDispatch, useInitialEffect, ReducersList } from 'shared/lib/hooks';
import { Layout } from 'widgets/layout';
import { TemplateDetailsPageHeader } from '../template-details-page-header/TemplateDetailsPageHeader';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateDetailsPage.module.scss';
import { TemplateRecommends } from 'features/template-recommends/ui/template-recommends/TemplateRecommends';
import { TemplateComments } from 'features/template-comments/ui/template-comments/TemplateComments';

interface ITemplateDetailsPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const reducerList: ReducersList = {
  templateDetails: templateDetailsReducer,
};

const TemplateDetailsPage: FC<ITemplateDetailsPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducerList, true);
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const { id } = useParams<{ id: string }>();

  const template = useSelector(getTemplateDetails);
  const isLoading = useSelector(getTemplateDetailsIsLoading);
  const error = useSelector(getTemplateDetailsError);

  useInitialEffect(() => {
    if (!id) {
      dispatch(templateDetailsActions.setError('Шаблон не найден'));
      return;
    }

    dispatch(fetchTemplateById({ id }));
  });

  return (
    <Layout>
      <section
        {...anotherProps}
        data-testid="templateDetailsPage"
        className={classNames(styles.template_details_page, {}, [className, 'page'])}
      >
        <TemplateDetailsPageHeader />
        <TemplateDetails template={template} isLoading={isLoading} error={error} />

        <TemplateRecommends />
        <TemplateComments />
      </section>
    </Layout>
  );
});

export default TemplateDetailsPage;
