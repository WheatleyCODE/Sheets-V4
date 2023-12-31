import { FC, memo } from 'react';
import { CommentListItem } from '../comment-list-item/CommentListItem';
import { intoIter } from '@/shared/lib/iterators';
import { Text } from '@/shared/ui/text';
import { HStack, VStack } from '@/shared/ui/containers';
import { Skeleton } from '@/shared/ui/skeleton';
import { classNames } from '@/shared/lib/class-names';
import type { ICommentListProps } from './CommentList.interface';
import type { IComment } from '../../model/types/comment.interface';
import styles from './CommentList.module.scss';

export const CommentList: FC<ICommentListProps> = memo((props) => {
  const {
    className,
    comments = [],
    isLoading,
    noCommentsText = 'Комментариев нет',
    navigateToProfileText,
    error,
    ...anotherProps
  } = props;

  const commentsArr = intoIter<IComment>(comments)
    .map((comment) => (
      <CommentListItem
        navigateToProfileText={navigateToProfileText}
        key={comment.id}
        className={styles.comment_item_skeleton}
        comment={comment}
      />
    ))
    .toArray();

  const skeletonsArr = intoIter<number>([1, 2, 3, 4])
    .enumerate()
    .map(([num, i]) => (
      <Skeleton key={num + i} className={styles.comment_item_skeleton}>
        <HStack gapMultiply="2">
          <Skeleton width={40} height={40} borderRadius="50%" />
          <Skeleton className={styles.comment_item_skeleton_username} />
        </HStack>

        <Skeleton className={styles.comment_item_skeleton_main} />
      </Skeleton>
    ))
    .toArray();

  if (isLoading) {
    return (
      <VStack {...anotherProps} data-testid="commentList" className={classNames(styles.comment_list, {}, [className])}>
        {skeletonsArr}
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack
        {...anotherProps}
        data-testid="commentList"
        className={classNames(styles.comment_list, {}, [className, styles.error])}
      >
        <Text text={error} textStyle="error" />
      </VStack>
    );
  }

  return (
    <VStack {...anotherProps} data-testid="commentList" className={classNames(styles.comment_list, {}, [className])}>
      {commentsArr.length ? commentsArr : <div className={styles.no_comments}>{noCommentsText}</div>}
    </VStack>
  );
});
