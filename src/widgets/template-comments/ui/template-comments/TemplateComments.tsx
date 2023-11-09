import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { templateCommentsReducer } from '../../model/slice/templateCommentsSlice';
import { getTemplateComments } from '../../model/selectors/get-template-comments/getTemplateComments';
import { fetchTemplateComments } from '../../model/services/fetch-template-comments/fetchTemplateComments';
import { getTemplateCommentsError } from '../../model/selectors/get-template-comments-error/getTemplateCommentsError';
import { getTemplateCommentsIsLoading } from '../../model/selectors/get-template-comments-is-loading/getTemplateCommentsIsLoading';
import { fetchTemplateAddComment } from '../../model/services/fetch-template-comments-add-comment/fetchTemplateAddComment';
import { AddCommentForm } from 'features/add-comment-form';
import { getUser } from 'features/user';
import { CommentList } from 'entities/comment';
import { useDynamicModule, useTypedDispatch, ReducersList, useInitialEffect } from 'shared/lib/hooks';
import { RWidth } from 'shared/ui/containers';
import { Text, TextSize } from 'shared/ui/text';
import { getTemplateDetails } from 'entities/template';
import { classNames } from 'shared/lib/class-names';
import type { ITemplateCommentsProps } from './TemplateComments.interface';
import styles from './TemplateComments.module.scss';

const reducers: ReducersList = { templateComments: templateCommentsReducer };

export const TemplateComments: FC<ITemplateCommentsProps> = (props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers, true);
  const dispatch = useTypedDispatch();
  const comments = useSelector(getTemplateComments.selectAll);
  const commentsError = useSelector(getTemplateCommentsError);
  const commentsIsLoading = useSelector(getTemplateCommentsIsLoading);
  const user = useSelector(getUser);
  const template = useSelector(getTemplateDetails);

  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const addComment = useCallback(
    (text: string) => {
      if (!user || !template) return;
      dispatch(fetchTemplateAddComment({ text, templateId: template.id, userId: user.id }));
    },
    [dispatch, template, user],
  );

  useInitialEffect(() => {
    if (!id) return;

    dispatch(fetchTemplateComments({ id }));
  });

  return (
    <div
      {...anotherProps}
      data-testid="templateComments"
      className={classNames(styles.template_comments, {}, [className])}
    >
      <RWidth className={styles.add_comment_form} maxWidth="template">
        <Text className={styles.comments_title} title={`${t('Добавить комментарий')}:`} />
        <AddCommentForm addComment={addComment} />
      </RWidth>

      <RWidth className={styles.comments} maxWidth="template">
        <Text className={styles.comments_title} textSize={TextSize.BIG} title={`${t('Комментарии')}:`} />
        <CommentList isLoading={commentsIsLoading} error={commentsError} comments={comments} />
      </RWidth>
    </div>
  );
};
