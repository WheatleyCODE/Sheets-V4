import { FC, memo, useCallback } from 'react';
import { MdAdsClick } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { VStack } from '@/shared/ui/containers';
import { Text } from '@/shared/ui/text';
import { Icon } from '@/shared/ui/icon';
import { classNames } from '@/shared/lib/class-names';
import type { INotificationListItemProps } from './NotificationListItem.interface';
import styles from './NotificationListItem.module.scss';

export const NotificationListItem: FC<INotificationListItemProps> = memo((props) => {
  const { className, notification, ...anotherProps } = props;
  const { title, description, href } = notification;
  const navigate = useNavigate();

  const navigateTo = useCallback(() => {
    if (href) navigate(href);
  }, [href, navigate]);

  return (
    <div
      {...anotherProps}
      data-testid="notificationListItem"
      className={classNames(styles.notification_list_item, { [styles.pointer]: !!href }, [className])}
      onClick={href ? navigateTo : undefined}
    >
      {!!href && (
        <div className={styles.click}>
          <Icon Icon={MdAdsClick} />
        </div>
      )}
      <VStack>
        <Text className={styles.title} text={title} />
        <Text text={description} textSize="small" />
      </VStack>
    </div>
  );
});
