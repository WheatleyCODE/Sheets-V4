import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IComment } from '../../model/types/comment';
import { Avatar } from 'shared/ui/avatar';
import { Text } from 'shared/ui/text';
import { Link } from 'shared/ui/link';
import { Title } from 'shared/ui/title';
import { RoutesPath } from 'shared/config/route-config/routeConfig';
import { classNames } from 'shared/lib/class-names';
import styles from './CommentListItem.module.scss';
interface ICommentListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: IComment;
}

export const CommentListItem: FC<ICommentListItemProps> = (props) => {
  const { className, comment, ...anotherProps } = props;
  const { t } = useTranslation();
  const { text, user } = comment;
  const { avatar, username, id } = user;

  return (
    <div
      {...anotherProps}
      data-testid="commentListItem"
      className={classNames(styles.comment_list_item, {}, [className])}
    >
      <Title text={`${t('Перейти на профиль пользователя')}, ${username}`}>
        {/* ! FIX path shared */}
        <Link to={RoutesPath.profile + id}>
          <div className={styles.header}>
            <Avatar width={40} height={40} src={avatar} />
            <Text className={styles.username} title={username} />
          </div>
        </Link>
      </Title>

      <div className={styles.main}>
        <Text text={text} />
      </div>
    </div>
  );
};
