import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import { ThemeSwitcher } from 'features/theme-switcher/ui/ThemeSwitcher';
import { Logo } from 'features/logo/ui/Logo';
import { useTheme } from 'app/providers';
import { NavigationMenu } from 'features/navigation-menu/ui/NavigationMenu';
import { LanguageSwitcher } from 'features/language-switcher/ui/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { User } from 'features/user/ui/User';
import styles from './Navbar.module.scss';

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Navbar: FC<NavbarProps> = (props) => {
  const { className, ...anotherProps } = props;
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

        <User t={t} />
      </div>
    </div>
  );
};
