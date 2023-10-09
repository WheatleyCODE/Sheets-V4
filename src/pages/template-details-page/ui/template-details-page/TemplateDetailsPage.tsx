import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { templateDetailsCommentsReducer } from '../../model/slice/templateDetailsCommentsSlice';
import { getTemplateDetailsComments } from '../../model/selectors/get-template-details-comments/getTemplateDetailsComments';
import { fetchTemplateDetailsComments } from '../../model/services/fetchTemplateDetailsComments';
import { getTemplateDetailsCommentsError } from '../../model/selectors/get-template-details-comments-error/getTemplateDetailsCommentsError';
import { getTemplateDetailsCommentsIsLoading } from '../../model/selectors/get-template-details-comments-is-loading/getTemplateDetailsCommentsIsLoading';
import {
  TemplateDetails,
  fetchTemplateById,
  getTemplateDetails,
  getTemplateDetailsError,
  getTemplateDetailsIsLoading,
  templateDetailsActions,
  templateDetailsReducer,
} from 'entities/template';
import { CommentList } from 'entities/comment';
import { Text, TextSize } from 'shared/ui/text';
import { useDynamicModule, useTypedDispatch, useInitialEffect } from 'shared/lib/hooks';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateDetailsPage.module.scss';

interface ITemplateDetailsPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const TemplateDetailsPage: FC<ITemplateDetailsPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(
    { templateDetails: templateDetailsReducer, templateDetailsComments: templateDetailsCommentsReducer },
    true,
  );
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const { id } = useParams<{ id: string }>();
  const template = useSelector(getTemplateDetails);
  const isLoading = useSelector(getTemplateDetailsIsLoading);
  const error = useSelector(getTemplateDetailsError);
  const comments = useSelector(getTemplateDetailsComments.selectAll);
  const commentsError = useSelector(getTemplateDetailsCommentsError);
  const commentsIsLoading = useSelector(getTemplateDetailsCommentsIsLoading);

  useInitialEffect(() => {
    if (!id) {
      dispatch(templateDetailsActions.setError('Шаблон не найден'));
      return;
    }

    dispatch(fetchTemplateById({ id }));
    dispatch(fetchTemplateDetailsComments({ id }));
  });

  return (
    <div
      {...anotherProps}
      data-testid="templateDetailsPage"
      className={classNames(styles.template_details_page, {}, [className, 'page'])}
    >
      <TemplateDetails template={template} isLoading={isLoading} error={error} />

      <div className={styles.comments}>
        <div className={styles.comments_width}>
          <Text className={styles.comments_title} textSize={TextSize.BIG} title={`${t('Комментарии')}:`} />
          <CommentList isLoading={commentsIsLoading} error={commentsError} comments={comments} />
        </div>
      </div>
    </div>
  );
});

export default TemplateDetailsPage;
