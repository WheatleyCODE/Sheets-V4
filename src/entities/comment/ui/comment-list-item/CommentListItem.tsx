import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './CommentListItem.module.scss';
import { IComment } from '../../model/types/comment';
import { Avatar } from 'shared/ui/avatar';
import { Text } from 'shared/ui/text';

interface ICommentListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: IComment;
}

export const CommentListItem: FC<ICommentListItemProps> = (props) => {
  const { className, comment, ...anotherProps } = props;
  const { text, user } = comment;
  const { avatar, username } = user;

  return (
    <div
      {...anotherProps}
      data-testid="commentListItem"
      className={classNames(styles.comment_list_item, {}, [className])}
    >
      <div className={styles.header}>
        <Avatar width={60} height={60} src={avatar} />
        <Text className={styles.username} title={username} />
      </div>

      <div className={styles.main}>
        <Text text={text} />
      </div>
    </div>
  );
};
