import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { MdOutlineAdminPanelSettings, MdOutlineLogout, MdOutlinePersonPin, MdPerson } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { isUserRoleAdmin, isUserRoleDeveloper } from '@/entities/user';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuItem, MDropdown, dropdownAnimations, usePopups } from '@/shared/ui/popups';
import { Avatar } from '@/shared/ui/avatar';
import { getRouteProfile, getRouteAdminPanel } from '@/shared/config/route-config/routeConfig';
import { classNames } from '@/shared/lib/class-names';
import type { IUserButtonProps } from './UserButton.interface';
import styles from './UserButton.module.scss';

export const UserButton: FC<IUserButtonProps> = memo((props) => {
  const { className, user, logout, openAuth, ...anotherProps } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isAdmin = useSelector(isUserRoleAdmin);
  const isDeveloper = useSelector(isUserRoleDeveloper);
  const { isShow, closePopup, togglePopup } = usePopups();

  const isUser = !!user;
  const isAccess = isAdmin || isDeveloper;
  const titleText = isUser ? t('Пользователь') : t('Войти');

  const logoutHandler = useCallback(() => {
    closePopup();
    logout();
  }, [logout, closePopup]);

  const navigateToProfile = useCallback(() => {
    if (!user) return;
    closePopup();
    navigate(getRouteProfile(user.id));
  }, [user, closePopup, navigate]);

  const navigateToAdminPanel = useCallback(() => {
    if (!user) return;
    closePopup();
    navigate(getRouteAdminPanel());
  }, [user, closePopup, navigate]);

  return (
    <div {...anotherProps} data-testid="logo" className={classNames(styles.user, {}, [className])}>
      <Title isStopShow={isShow} text={titleText}>
        {isUser ? (
          <Avatar className={styles.avatar} onClick={togglePopup} width={40} height={40} src={user.avatar} />
        ) : (
          <Button text="Войти" onClick={openAuth} Icon={MdPerson} />
        )}
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown {...dropdownAnimations.height} closePopup={closePopup} className={styles.dropdown}>
            <DropdownMenu>
              {isAccess && (
                <DropdownMenuItem
                  Icon={MdOutlineAdminPanelSettings}
                  onClick={navigateToAdminPanel}
                  text={t('Админ панель')}
                />
              )}
              <DropdownMenuItem Icon={MdOutlinePersonPin} onClick={navigateToProfile} text={t('Профиль')} />
              <DropdownMenuItem Icon={MdOutlineLogout} onClick={logoutHandler} text={t('Выйти')} />
            </DropdownMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
});
