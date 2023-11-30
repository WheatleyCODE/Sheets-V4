import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { templateCommentsReducer } from '../../model/slice/templateCommentsSlice';
import { useTemplateCommentsSelectAll } from '../../model/selectors/get-template-comments/getTemplateComments';
import { useFetchTemplateComments } from '../../model/services/fetch-template-comments/fetchTemplateComments';
import { useTemplateCommentsError } from '../../model/selectors/get-template-comments-error/getTemplateCommentsError';
import { useTemplateCommentsIsLoading } from '../../model/selectors/get-template-comments-is-loading/getTemplateCommentsIsLoading';
import { useFetchTemplateAddComment } from '../../model/services/fetch-template-comments-add-comment/fetchTemplateAddComment';
import { AddCommentForm } from '@/features/add-comment-form';
import { useUser } from '@/entities/user';
import { CommentList } from '@/entities/comment';
import { useDynamicModule, ReducersList, useInitialEffect } from '@/shared/lib/hooks';
import { RWidth } from '@/shared/ui/containers';
import { Text } from '@/shared/ui/text';
import { useTemplateDetails } from '@/entities/template';
import { classNames } from '@/shared/lib/class-names';
import type { ITemplateCommentsProps } from './TemplateComments.interface';
import styles from './TemplateComments.module.scss';

const reducers: ReducersList = { templateComments: templateCommentsReducer };

export const TemplateComments: FC<ITemplateCommentsProps> = (props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers, true);

  const fetchTemplateComments = useFetchTemplateComments();
  const fetchTemplateAddComment = useFetchTemplateAddComment();
  const comments = useTemplateCommentsSelectAll();
  const commentsError = useTemplateCommentsError();
  const commentsIsLoading = useTemplateCommentsIsLoading();
  const user = useUser();
  const template = useTemplateDetails();

  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const addComment = useCallback(
    (text: string) => {
      if (!user || !template) return;
      fetchTemplateAddComment({ text, templateId: template.id, userId: user.id });
    },
    [fetchTemplateAddComment, template, user],
  );

  useInitialEffect(() => {
    if (!id) return;

    fetchTemplateComments({ id });
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
        <Text className={styles.comments_title} textSize="big" title={`${t('Комментарии')}:`} />
        <CommentList isLoading={commentsIsLoading} error={commentsError} comments={comments} />
      </RWidth>
    </div>
  );
};
