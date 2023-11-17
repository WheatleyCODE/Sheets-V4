import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import { NotificationListItem } from '../notification-list-item/NotificationListItem';
import { useNotifications } from '../../api/notification.api';
import { VStack } from '@/shared/ui/containers';
import { Text } from '@/shared/ui/text';
import { Skeleton } from '@/shared/ui/skeleton';
import { intoIter } from '@/shared/lib/iterators';
import type { INotificationListProps } from './NotificationList.interface';
import type { INotification } from '../../model/types/notification.interface';
import styles from './NotificationList.module.scss';

export const NotificationList: FC<INotificationListProps> = memo((props) => {
  const { className, onLinkClick, ...anotherProps } = props;
  const { t } = useTranslation();
  const { data, isLoading, error } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <div
        {...anotherProps}
        data-testid="notificationList"
        className={classNames(styles.notification_list, {}, [className])}
      >
        <Skeleton className={styles.item_skeleton} />
        <Skeleton className={styles.item_skeleton} />
        <Skeleton className={styles.item_skeleton} />
        <Skeleton className={styles.item_skeleton} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        {...anotherProps}
        data-testid="notificationList"
        className={classNames(styles.notification_list, {}, [className])}
      >
        <VStack>
          <Text textStyle="error" title={t('Произошла ошибка при загрузке оповещений')} />
        </VStack>
      </div>
    );
  }

  const items = intoIter<INotification>(data)
    .map((notification) => (
      <NotificationListItem
        onLinkClick={onLinkClick}
        key={notification.id}
        className={styles.item_skeleton}
        notification={notification}
      />
    ))
    .toArray();

  return (
    <div
      {...anotherProps}
      data-testid="notificationList"
      className={classNames(styles.notification_list, {}, [className])}
    >
      {items}
    </div>
  );
});
