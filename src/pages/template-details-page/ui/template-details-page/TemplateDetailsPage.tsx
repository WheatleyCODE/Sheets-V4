import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { templateDetailsCommentsReducer } from '../../model/slice/templateDetailsCommentsSlice';
import { getTemplateDetailsComments } from '../../model/selectors/get-template-details-comments/getTemplateDetailsComments';
import { fetchTemplateDetailsComments } from '../../model/services/fetch-template-details-comments/fetchTemplateDetailsComments';
import { getTemplateDetailsCommentsError } from '../../model/selectors/get-template-details-comments-error/getTemplateDetailsCommentsError';
import { getTemplateDetailsCommentsIsLoading } from '../../model/selectors/get-template-details-comments-is-loading/getTemplateDetailsCommentsIsLoading';
import { fetchTemplateDetailsAddComment } from '../../model/services/fetch-template-details-add-comment/fetchTemplateDetailsAddComment';
import {
  TemplateDetails,
  TemplateList,
  fetchTemplateById,
  getTemplateDetails,
  getTemplateDetailsError,
  getTemplateDetailsIsLoading,
  templateDetailsActions,
  templateDetailsReducer,
} from 'entities/template';
import { getUser } from 'entities/user';
import { CommentList } from 'entities/comment';
import { Text, TextSize } from 'shared/ui/text';
import { useDynamicModule, useTypedDispatch, useInitialEffect, ReducersList } from 'shared/lib/hooks';
import { AddCommentForm } from 'features/add-comment-form';
import { Button } from 'shared/ui/button';
import { MdChevronLeft } from 'react-icons/md';
import { Title } from 'shared/ui/title';
import { RoutesPath } from 'shared/config/route-config/routeConfig';
import { Layout } from 'widgets/layout';
import { classNames } from 'shared/lib/class-names';
import styles from './TemplateDetailsPage.module.scss';
import { templateDetailsRecommendsReducer } from '../../model/slice/templateDetailsRecommendsSlice';
import { getTemplateDetailsRecommends } from '../../model/selectors/get-template-details-recommends/getTemplateDetailsRecommends';
import { getTemplateDetailsRecommendsError } from '../../model/selectors/get-template-details-recommends-error/getTemplateDetailsRecommendsError';
import { getTemplateDetailsRecommendsIsLoading } from '../../model/selectors/get-template-details-recommends-is-loading/getTemplateDetailsRecommendsIsLoaing';
import { fetchTemplateDetailsRecommends } from '../../model/services/fetch-template-details-recommends/fetchTemplateDetailsRecommends';

interface ITemplateDetailsPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const reducerList: ReducersList = {
  templateDetails: templateDetailsReducer,
  templateDetailsComments: templateDetailsCommentsReducer,
  templateDetailsRecommends: templateDetailsRecommendsReducer,
};

const TemplateDetailsPage: FC<ITemplateDetailsPageProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducerList, true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { id } = useParams<{ id: string }>();

  const template = useSelector(getTemplateDetails);
  const isLoading = useSelector(getTemplateDetailsIsLoading);
  const error = useSelector(getTemplateDetailsError);
  const user = useSelector(getUser);

  const comments = useSelector(getTemplateDetailsComments.selectAll);
  const commentsError = useSelector(getTemplateDetailsCommentsError);
  const commentsIsLoading = useSelector(getTemplateDetailsCommentsIsLoading);

  const recommends = useSelector(getTemplateDetailsRecommends.selectAll);
  const recommendsError = useSelector(getTemplateDetailsRecommendsError);
  const recommendsIsLoading = useSelector(getTemplateDetailsRecommendsIsLoading);

  useInitialEffect(() => {
    if (!id) {
      dispatch(templateDetailsActions.setError('Шаблон не найден'));
      return;
    }

    dispatch(fetchTemplateById({ id }));
    dispatch(fetchTemplateDetailsComments({ id }));
    dispatch(fetchTemplateDetailsRecommends());
  });

  const addComment = useCallback(
    (text: string) => {
      if (!user || !template) return;
      dispatch(fetchTemplateDetailsAddComment({ text, templateId: template.id, userId: user.id }));
    },
    [dispatch, template, user],
  );

  const navigateToTemplates = useCallback(() => {
    navigate(RoutesPath.templates);
  }, []);

  return (
    <Layout>
      <section
        {...anotherProps}
        data-testid="templateDetailsPage"
        className={classNames(styles.template_details_page, {}, [className, 'page'])}
      >
        <div className={styles.back}>
          <Title text={t('Вернуться к шаблонам')}>
            <Button onClick={navigateToTemplates} Icon={MdChevronLeft} text={t('Вернуться к шаблонам')} />
          </Title>
        </div>

        <TemplateDetails template={template} isLoading={isLoading} error={error} />

        <div className={styles.recommends}>
          <div className={styles.recommends_width}>
            <Text title={`${t('Рекомендуем')}:`} />
            <TemplateList
              isOpenInNewWindow={true}
              templates={recommends}
              isLoading={recommendsIsLoading}
              error={recommendsError}
            />
          </div>
        </div>

        <div className={styles.add_comment_form}>
          <div className={styles.add_comment_form_width}>
            <Text className={styles.comments_title} title={`${t('Добавить комментарий')}:`} />
            <AddCommentForm addComment={addComment} />
          </div>
        </div>

        <div className={styles.comments}>
          <div className={styles.comments_width}>
            <Text className={styles.comments_title} textSize={TextSize.BIG} title={`${t('Комментарии')}:`} />
            <CommentList isLoading={commentsIsLoading} error={commentsError} comments={comments} />
          </div>
        </div>
      </section>
    </Layout>
  );
});

export default TemplateDetailsPage;
