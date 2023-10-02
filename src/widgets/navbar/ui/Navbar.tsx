import { FC, memo, useCallback } from 'react';
import { ThemeSwitcher } from 'features/theme-switcher/';
import { Logo } from 'entities/logo/ui/Logo';
import { NavigationMenu } from 'features/navigation-menu/';
import { LanguageSwitcher } from 'features/language-switcher/';
import { User, getUser, userActions } from 'entities/user';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from 'shared/lib/hooks/useTypedDispatch';
import { useNavigate } from 'react-router-dom';
import { ModalsHash } from 'widgets/layout';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts/local-storage/localStorage';
import { KVFactory } from 'shared/lib/kv-storage';
import { classNames } from 'shared/lib/class-names';
import styles from './Navbar.module.scss';

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

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
    <div data-testid="navbar" className={classNames(styles.navbar, {}, [className])}>
      <div className={styles.left_side}>
        <NavigationMenu />

        <Logo />
      </div>

      <div className={styles.right_side}>
        <LanguageSwitcher className={styles.margin_right} />
        <ThemeSwitcher className={styles.margin_right} />
        <User openAuth={openAuth} logout={logout} user={user} />
      </div>
    </div>
  );
});
