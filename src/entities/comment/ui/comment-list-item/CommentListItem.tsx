import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/avatar';
import { Text } from '@/shared/ui/text';
import { Link } from '@/shared/ui/link';
import { Title } from '@/shared/ui/title';
import { HStack, VStack } from '@/shared/ui/containers';
import { RoutesPath } from '@/shared/config/route-config/routeConfig';
import { concatURLs } from '@/shared/lib/url';
import { classNames } from '@/shared/lib/class-names';
import type { ICommentListItemProps } from './CommentListItem.interface';
import styles from './CommentListItem.module.scss';

export const CommentListItem: FC<ICommentListItemProps> = (props) => {
  const { className, comment, ...anotherProps } = props;
  const { t } = useTranslation();
  const { text, user } = comment;
  const { avatar, username, id } = user;

  return (
    <VStack
      align="start"
      {...anotherProps}
      data-testid="commentListItem"
      className={classNames(styles.comment_list_item, {}, [className])}
    >
      <Title text={`${t('Перейти на профиль пользователя')}, ${username}`}>
        <Link to={concatURLs(RoutesPath.profile, id)}>
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
};
