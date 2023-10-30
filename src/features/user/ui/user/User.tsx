import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout, MdOutlinePersonPin, MdPerson } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../model/types/user';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { DropdownMenu, DropdownMenuItem, MDropdown, useDropdown } from 'shared/ui/dropdown';
import { ANIMATION_DURATION } from 'shared/consts';
import { AnimatePresence } from 'framer-motion';
import { Avatar } from 'shared/ui/avatar';
import { RoutesPath } from 'shared/config/route-config/routeConfig';
import { classNames } from 'shared/lib/class-names';
import styles from './User.module.scss';

interface IUserProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: IUser;
  openAuth: () => void;
  logout: () => void;
}

export const User: FC<IUserProps> = memo((props) => {
  const { className, user, logout, openAuth, ...anotherProps } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();

  const isUser = !!user?.email;
  const titleText = isUser ? t('Пользователь') : t('Войти');

  const logoutHandler = useCallback(() => {
    closeDropdown();
    logout();
  }, [logout, closeDropdown]);

  const navigateToProfile = useCallback(() => {
    if (!user) return;
    closeDropdown();
    // ! FIX PATH
    navigate(`${RoutesPath.profile}${user.id}`);
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
              <DropdownMenuItem Icon={MdOutlinePersonPin} onClick={navigateToProfile} text={t('Профиль')} />
              <DropdownMenuItem Icon={MdOutlineLogout} onClick={logoutHandler} text={t('Выйти')} />
            </DropdownMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
});
