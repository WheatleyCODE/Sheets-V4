import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MdPerson } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useUserRoleIsAdmin, useUserRoleIsDeveloper } from '@/entities/user';
import { getUserItems } from '../../model/consts/userItems.consts';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';
import { MDropdown, dropdownAnimations, usePopups } from '@/shared/ui/popups';
import { Avatar } from '@/shared/ui/avatar';
import { getRouteProfile, getRouteAdminPanel } from '@/shared/config/route-config/routeConfig';
import { classNames } from '@/shared/lib/class-names';
import type { IUserButtonProps } from './UserButton.interface';
import styles from './UserButton.module.scss';

export const UserButton: FC<IUserButtonProps> = memo((props) => {
  const { className, user, logout, openAuth, ...anotherProps } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isAdmin = useUserRoleIsAdmin();
  const isDeveloper = useUserRoleIsDeveloper();
  const { isShow, closePopup, togglePopup } = usePopups();

  const isUser = !!user;
  const isAccess = isAdmin || isDeveloper;
  const titleText = isUser ? t('Пользователь') : t('Войти');

  const { data, dataChangers, eventHandlers, ref } = useControllableMenu({
    items: getUserItems(t, isAccess),
    isHorizontalReverse: true,
    onSelectItem: async (item) => {
      closePopup();
      if (!user) return;

      if (item.value === 'Админ панель') navigate(getRouteAdminPanel());
      if (item.value === 'Профиль') navigate(getRouteProfile(user.id));
      if (item.value === 'Выйти') logout();
      // * Norm, async function =)
      dataChangers.changeMenuState(0, 0);
    },
    isDisableKeydown: !isShow,
  });

  const closeHandler = useCallback(() => {
    dataChangers.changeMenuState(0, 0);
    closePopup();
  }, [closePopup, dataChangers]);

  return (
    <div {...anotherProps} data-testid="logo" className={classNames(styles.user, {}, [className])}>
      <Title isStopShow={isShow} text={titleText}>
        {isUser ? (
          <Avatar className={styles.avatar} onClick={togglePopup} width={40} height={40} src={user.avatar} />
        ) : (
          <Button text={t('Войти')} onClick={openAuth} Icon={MdPerson} />
        )}
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown {...dropdownAnimations.height} closePopup={closeHandler} className={styles.dropdown}>
            <ControllableMenu {...data} {...dataChangers} {...eventHandlers} menuRef={ref} />
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
});
