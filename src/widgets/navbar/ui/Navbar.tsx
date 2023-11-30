import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeSwitcher } from '@/features/theme-switcher';
import { NavigationMenu } from '@/features/navigation-menu';
import { LanguageSwitcher } from '@/features/language-switcher';
import { UserButton } from '@/features/user-button';
import { useUser, useUserActions } from '@/entities/user';
import { Logo } from '@/entities/logo';
import { HStack } from '@/shared/ui/containers';
import { LS_AUTH_KEY } from '@/shared/consts';
import { KVFactory } from '@/shared/lib/kv-storage';
import { NotificationButton } from '@/features/notification-button';
import { classNames } from '@/shared/lib/class-names';
import type { NavbarProps } from './Navbar.interface';
import styles from './Navbar.module.scss';

// ! FIX
// eslint-disable-next-line wheatley-code/layer-imports
import { ModalsHash } from '@/widgets/layout';

// * Sync
const ls = KVFactory();

export const Navbar: FC<NavbarProps> = memo((props) => {
  const { className } = props;
  const { logout } = useUserActions();
  const navigate = useNavigate();
  const user = useUser();

  const openAuth = useCallback(() => {
    navigate(ModalsHash.AUTH);
  }, [navigate]);

  const logoutHandler = useCallback(async () => {
    ls.remove(LS_AUTH_KEY);
    logout();
  }, [logout]);

  const isUser = !!user;

  return (
    <header data-testid="navbar" className={classNames(styles.navbar, {}, [className])}>
      <HStack>
        <NavigationMenu />
        <Logo />
      </HStack>

      <HStack gapMultiply="2">
        {isUser && <NotificationButton />}
        <LanguageSwitcher />
        {isUser && <ThemeSwitcher user={user} />}
        <UserButton openAuth={openAuth} logout={logoutHandler} user={user} />
      </HStack>
    </header>
  );
});
