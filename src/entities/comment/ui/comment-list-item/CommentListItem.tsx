import { FC, memo } from 'react';
import { Avatar } from '@/shared/ui/avatar';
import { Text } from '@/shared/ui/text';
import { Link } from '@/shared/ui/link';
import { Title } from '@/shared/ui/title';
import { HStack, VStack } from '@/shared/ui/containers';
import { getRouteProfile } from '@/shared/config/route-config/routeConfig';
import { classNames } from '@/shared/lib/class-names';
import type { ICommentListItemProps } from './CommentListItem.interface';
import styles from './CommentListItem.module.scss';

export const CommentListItem: FC<ICommentListItemProps> = memo((props) => {
  const { className, comment, navigateToProfileText = 'Перейти на профиль пользователя', ...anotherProps } = props;
  const { text, user } = comment;
  const { avatar, username, id } = user;

  return (
    <VStack
      align="start"
      {...anotherProps}
      data-testid="commentListItem"
      className={classNames(styles.comment_list_item, {}, [className])}
    >
      <Title text={`${navigateToProfileText}, ${username}`}>
        <Link to={getRouteProfile(id)}>
          <HStack gapMultiply="2" className={styles.header}>
            <Avatar width={40} height={40} src={avatar} />
            <Text title={username} />
          </HStack>
        </Link>
      </Title>

      <HStack className={styles.main}>
        <Text text={text} />
      </HStack>
    </VStack>
  );
});
