import { FC } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { AnimatePresence } from 'framer-motion';
import { MdNotificationsNone } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { NotificationList } from '@/entities/notification';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { MobileDrawer } from '@/shared/ui/modals/ui/mobile-drawer/MobileDrawer';
import { Backdrop, Portal, useModals } from '@/shared/ui/modals';
import { MDropdown, dropdownAnimations, usePopups } from '@/shared/ui/popups';
import { classNames } from '@/shared/lib/class-names';
import type { INotificationButtonProps } from './NotificationButton.interface';
import styles from './NotificationButton.module.scss';

export const NotificationButton: FC<INotificationButtonProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closePopup, togglePopup } = usePopups();
  const { isShow: isShowModal, closeModal, toggleModal } = useModals();
  const { t } = useTranslation();

  return (
    <div
      {...anotherProps}
      data-testid="notificationButton"
      className={classNames(styles.notification_button, {}, [className])}
    >
      <BrowserView>
        <Title isStopShow={isShow} text={t('Оповещения')}>
          <Button Icon={MdNotificationsNone} onClick={togglePopup} />
        </Title>

        <AnimatePresence>
          {isShow && (
            <MDropdown {...dropdownAnimations.height} closePopup={closePopup} className={styles.dropdown}>
              <NotificationList onLinkClick={closePopup} />
            </MDropdown>
          )}
        </AnimatePresence>
      </BrowserView>

      <MobileView>
        <Title isStopShow={isShowModal} text={t('Оповещения')}>
          <Button Icon={MdNotificationsNone} onClick={toggleModal} />
        </Title>

        <AnimatePresence>
          {isShowModal && (
            <Portal>
              <Backdrop onClose={closeModal}>
                <MobileDrawer onClose={closeModal}>
                  <NotificationList onLinkClick={closeModal} />
                </MobileDrawer>
              </Backdrop>
            </Portal>
          )}
        </AnimatePresence>
      </MobileView>
    </div>
  );
};
