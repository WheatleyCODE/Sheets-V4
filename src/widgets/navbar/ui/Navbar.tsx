import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { ThemeSwitcher } from 'features/theme-switcher/';
import { Logo } from 'features/logo/ui/Logo';
import { useTheme } from 'app/providers';
import { NavigationMenu } from 'features/navigation-menu/';
import { LanguageSwitcher } from 'features/language-switcher/';
import { useTranslation } from 'react-i18next';
import { User, getUser } from 'entities/user';
import styles from './Navbar.module.scss';
import { useSelector } from 'react-redux';

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Navbar: FC<NavbarProps> = (props) => {
  const { className, ...anotherProps } = props;
  const user = useSelector(getUser);
  const { theme } = useTheme();
  const { t } = useTranslation('home');

  return (
    <div data-testid="navbar" className={classNames(styles.navbar, {}, [className])}>
      <div className={styles.left_side}>
        <NavigationMenu t={t} />

        <Logo t={t} theme={theme} />
      </div>

      <div className={styles.right_side}>
        <LanguageSwitcher className={styles.margin_right} />

        <ThemeSwitcher className={styles.margin_right} t={t} />

        <User user={user} t={t} />
      </div>
    </div>
  );
};
