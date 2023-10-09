import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IComment } from '../../model/types/comment';
import { CommentListItem } from '../comment-list-item/CommentListItem';
import { intoIter } from 'shared/lib/iterators';
import { classNames } from 'shared/lib/class-names';
import styles from './CommentList.module.scss';
import { Text, TextStyle } from 'shared/ui/text';
import { Skeleton } from 'shared/ui/skeleton';

interface ICommentListProps extends React.HTMLAttributes<HTMLDivElement> {
  comments?: IComment[];
  isLoading?: boolean;
  error?: string | null;
}

export const CommentList: FC<ICommentListProps> = (props) => {
  const { className, comments = [], isLoading, error, ...anotherProps } = props;
  const { t } = useTranslation();

  const commentsArr = intoIter<IComment>(comments)
    .map((comment) => <CommentListItem key={comment.id} className={styles.comment_item_skeleton} comment={comment} />)
    .toArray();

  const skeletonsArr = intoIter([1, 2, 3, 4])
    .map(() => (
      <Skeleton className={styles.comment_item_skeleton}>
        <div className={styles.comment_item_skeleton_header}>
          <Skeleton width={70} height={70} borderRadius="50%" />
          <Skeleton className={styles.comment_item_skeleton_username} />
        </div>
        <Skeleton className={styles.comment_item_skeleton_main} />
      </Skeleton>
    ))
    .toArray();

  if (isLoading) {
    return (
      <div {...anotherProps} data-testid="commentList" className={classNames(styles.comment_list, {}, [className])}>
        {skeletonsArr}
      </div>
    );
  }

  if (error) {
    return (
      <div
        {...anotherProps}
        data-testid="commentList"
        className={classNames(styles.comment_list, {}, [className, styles.error])}
      >
        <Text text={error} textStyle={TextStyle.ERROR} />
      </div>
    );
  }

  return (
    <div {...anotherProps} data-testid="commentList" className={classNames(styles.comment_list, {}, [className])}>
      {commentsArr.length ? commentsArr : <div className={styles.no_comments}>{t('Комментариев нет')}</div>}
    </div>
  );
};
