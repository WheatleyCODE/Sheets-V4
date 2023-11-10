import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdNotificationsNone } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { NotificationList } from '@/entities/notification';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { MDropdown, useDropdown } from '@/shared/ui/dropdown';
import { ANIMATION_DURATION } from '@/shared/consts';
import { classNames } from '@/shared/lib/class-names';
import type { INotificationButtonProps } from './NotificationButton.interface';
import styles from './NotificationButton.module.scss';

export const NotificationButton: FC<INotificationButtonProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();
  const { t } = useTranslation();

  return (
    <div
      {...anotherProps}
      data-testid="notificationButton"
      className={classNames(styles.notification_button, {}, [className])}
    >
      <Title isStopShow={isShow} text={t('Оповещения')}>
        <Button Icon={MdNotificationsNone} onClick={toggleDropdown} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown
            exit={{ height: 0 }}
            animate={{ height: 'auto' }}
            initial={{ height: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            closeDropdown={closeDropdown}
            className={styles.dropdown}
          >
            <NotificationList />
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
