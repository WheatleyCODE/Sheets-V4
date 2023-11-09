import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ModalsHash } from 'widgets/layout';
import { ThemeSwitcher } from 'features/theme-switcher';
import { NavigationMenu } from 'features/navigation-menu';
import { LanguageSwitcher } from 'features/language-switcher';
import { User, getUser, userActions } from 'features/user';
import { Logo } from 'entities/logo';
import { useTypedDispatch } from 'shared/lib/hooks';
import { HStack } from 'shared/ui/containers';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts';
import { KVFactory } from 'shared/lib/kv-storage';
import { classNames } from 'shared/lib/class-names';
import type { NavbarProps } from './Navbar.interface';
import styles from './Navbar.module.scss';

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export const Navbar: FC<NavbarProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const openAuth = useCallback(() => {
    navigate(ModalsHash.AUTH);
  }, [navigate]);

  const logout = useCallback(async () => {
    await ls.remove(LS_AUTH_KEY);
    dispatch(userActions.logout());
  }, [dispatch]);

  return (
    <header data-testid="navbar" className={classNames(styles.navbar, {}, [className])}>
      <HStack>
        <NavigationMenu />
        <Logo />
      </HStack>

      <HStack gapMultiply="2">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <User openAuth={openAuth} logout={logout} user={user} />
      </HStack>
    </header>
  );
});
