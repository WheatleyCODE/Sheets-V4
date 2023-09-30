import { FC, useCallback } from 'react';
import { classNames } from 'shared/lib/class-names';
import { ThemeSwitcher } from 'features/theme-switcher/';
import { Logo } from 'entities/logo/ui/Logo';
import { useTheme } from 'app/providers';
import { NavigationMenu } from 'features/navigation-menu/';
import { LanguageSwitcher } from 'features/language-switcher/';
import { useTranslation } from 'react-i18next';
import { User, getUser, userActions } from 'entities/user';
import styles from './Navbar.module.scss';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from 'shared/lib/hooks/useTypedDispatch';
import { useNavigate } from 'react-router-dom';
import { ModalsHash } from 'widgets/layout';
import { LS_AUTH_KEY, LS_DEFAULT_NAMESPACE } from 'shared/consts/local-storage/localStorage';
import { KVFactory } from 'shared/lib/kv-storage';

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const ls = KVFactory(LS_DEFAULT_NAMESPACE);

export const Navbar: FC<NavbarProps> = (props) => {
  const { className, ...anotherProps } = props;
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const { theme } = useTheme();
  const { t } = useTranslation('home');

  const openAuth = useCallback(() => {
    navigate(ModalsHash.AUTH);
  }, [navigate]);

  const logout = useCallback(async () => {
    await ls.remove(LS_AUTH_KEY);
    dispatch(userActions.logout());
  }, [dispatch]);

  return (
    <div {...anotherProps} data-testid="navbar" className={classNames(styles.navbar, {}, [className])}>
      <div className={styles.left_side}>
        <NavigationMenu t={t} />

        <Logo t={t} theme={theme} />
      </div>

      <div className={styles.right_side}>
        <LanguageSwitcher className={styles.margin_right} />
        <ThemeSwitcher className={styles.margin_right} t={t} />
        <User openAuth={openAuth} logout={logout} user={user} />
      </div>
    </div>
  );
};
