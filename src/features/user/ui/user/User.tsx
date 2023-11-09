import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdOutlineAdminPanelSettings, MdOutlineLogout, MdOutlinePersonPin, MdPerson } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { isUserRoleAdmin, isUserRoleDeveloper } from '../../model/selectors/user-role-selector/userRoleSelector';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { DropdownMenu, DropdownMenuItem, MDropdown, useDropdown } from 'shared/ui/dropdown';
import { ANIMATION_DURATION } from 'shared/consts';
import { AnimatePresence } from 'framer-motion';
import { Avatar } from 'shared/ui/avatar';
import { RoutesPath } from 'shared/config/route-config/routeConfig';
import { concatURLs } from 'shared/lib/url';
import { classNames } from 'shared/lib/class-names';
import type { IUserProps } from './User.interface';
import styles from './User.module.scss';

export const User: FC<IUserProps> = memo((props) => {
  const { className, user, logout, openAuth, ...anotherProps } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isAdmin = useSelector(isUserRoleAdmin);
  const isDeveloper = useSelector(isUserRoleDeveloper);
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();

  const isUser = !!user;
  const isAccess = isAdmin || isDeveloper;
  const titleText = isUser ? t('Пользователь') : t('Войти');

  const logoutHandler = useCallback(() => {
    closeDropdown();
    logout();
  }, [logout, closeDropdown]);

  const navigateToProfile = useCallback(() => {
    if (!user) return;
    closeDropdown();
    navigate(concatURLs(RoutesPath.profile, user.id));
  }, [user, closeDropdown, navigate]);

  const navigateToAdminPanel = useCallback(() => {
    if (!user) return;
    closeDropdown();
    navigate(RoutesPath.admin_panel);
  }, [user, closeDropdown, navigate]);

  return (
    <div {...anotherProps} data-testid="logo" className={classNames(styles.user, {}, [className])}>
      <Title isStopShow={isShow} text={titleText}>
        {isUser ? (
          <Avatar className={styles.avatar} onClick={toggleDropdown} width={40} height={40} src={user.avatar} />
        ) : (
          <Button text="Войти" onClick={openAuth} Icon={MdPerson} />
        )}
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
