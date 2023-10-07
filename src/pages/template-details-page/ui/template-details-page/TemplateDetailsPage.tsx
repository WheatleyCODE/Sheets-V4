import { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  TemplateDetails,
  fetchTemplateById,
  getTemplateDetails,
  getTemplateDetailsError,
  getTemplateDetailsIsLoading,
  templateDetailsActions,
  templateDetailsReducer,
} from 'entities/template';
import { useDynamicModule, useTypedDispatch } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateDetailsPage.module.scss';

interface ITemplateDetailsPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const TemplateDetailsPage: FC<ITemplateDetailsPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule({ templateDetails: templateDetailsReducer }, true);
  const dispatch = useTypedDispatch();
  const { id } = useParams<{ id: string }>();
  const template = useSelector(getTemplateDetails);
  const isLoading = useSelector(getTemplateDetailsIsLoading);
  const error = useSelector(getTemplateDetailsError);

  useEffect(() => {
    if (!id) {
      dispatch(templateDetailsActions.setError('Шаблон не найден'));
      return;
    }

    dispatch(fetchTemplateById({ id }));
  }, [dispatch, id]);

  return (
    <div
      {...anotherProps}
      data-testid="templateDetailsPage"
      className={classNames(styles.template_details_page, {}, [className, 'page'])}
    >
      <TemplateDetails template={template} isLoading={isLoading} error={error} />
    </div>
  );
});

export default TemplateDetailsPage;
