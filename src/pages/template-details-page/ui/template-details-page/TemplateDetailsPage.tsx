import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { templateDetailsCommentsReducer } from '../../model/slice/templateDetailsCommentsSlice';
import { getTemplateDetailsComments } from '../../model/selectors/get-template-details-comments/getTemplateDetailsComments';
import { fetchTemplateDetailsComments } from '../../model/services/fetch-template-details-comments/fetchTemplateDetailsComments';
import { getTemplateDetailsCommentsError } from '../../model/selectors/get-template-details-comments-error/getTemplateDetailsCommentsError';
import { getTemplateDetailsCommentsIsLoading } from '../../model/selectors/get-template-details-comments-is-loading/getTemplateDetailsCommentsIsLoading';
import { fetchTemplateDetailsAddComment } from '../../model/services/fetch-template-details-add-comment/fetchTemplateDetailsAddComment';
import {
  TemplateDetails,
  // TemplateList,
  fetchTemplateById,
  getTemplateDetails,
  getTemplateDetailsError,
  getTemplateDetailsIsLoading,
  templateDetailsActions,
  templateDetailsReducer,
} from 'entities/template';
import { getUser } from 'features/user';
import { CommentList } from 'entities/comment';
import { useDynamicModule, useTypedDispatch, useInitialEffect, ReducersList } from 'shared/lib/hooks';
import { AddCommentForm } from 'features/add-comment-form';
import { Layout } from 'widgets/layout';
import { TemplateDetailsPageHeader } from '../template-details-page-header/TemplateDetailsPageHeader';
import { RWidth } from 'shared/ui/containers';
import { Text, TextSize } from 'shared/ui/text';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateDetailsPage.module.scss';
import { TemplateRecommends } from 'features/template-recommends/ui/template-recommends/TemplateRecommends';

interface ITemplateDetailsPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const reducerList: ReducersList = {
  templateDetails: templateDetailsReducer,
  templateDetailsComments: templateDetailsCommentsReducer,
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
  const user = useSelector(getUser);

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

  const addComment = useCallback(
    (text: string) => {
      if (!user || !template) return;
      dispatch(fetchTemplateDetailsAddComment({ text, templateId: template.id, userId: user.id }));
    },
    [dispatch, template, user],
  );

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

        <RWidth className={styles.add_comment_form} maxWidth="template">
          <Text className={styles.comments_title} title={`${t('Добавить комментарий')}:`} />
          <AddCommentForm addComment={addComment} />
        </RWidth>

        <RWidth className={styles.comments} maxWidth="template">
          <Text className={styles.comments_title} textSize={TextSize.BIG} title={`${t('Комментарии')}:`} />
          <CommentList isLoading={commentsIsLoading} error={commentsError} comments={comments} />
        </RWidth>
      </section>
    </Layout>
  );
});

export default TemplateDetailsPage;
