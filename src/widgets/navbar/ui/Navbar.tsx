import { FC } from "react";
import { MdPerson } from "react-icons/md";
import { Button } from "shared/ui/button";
import { Title } from "shared/ui/title";
import { classNames } from "shared/lib/class-names";
import { ThemeSwitcher } from "features/theme-switcher/ui/ThemeSwitcher";
import styles from "./Navbar.module.scss";
import { Logo } from "features/logo/ui/Logo";
import { useTheme } from "app/providers";
import { NavigationMenu } from "features/navigation-menu/ui/NavigationMenu";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Navbar: FC<NavbarProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      {...anotherProps}
      className={classNames(styles.navbar, {}, [className])}
    >
      <div className={styles.left_side}>
        <NavigationMenu />

        <Logo theme={theme} />
      </div>

      <div className={styles.right_side}>
        <ThemeSwitcher
          className={styles.margin_right}
          toggleTheme={toggleTheme}
        />

        <Title text="Пользователь">
          <Button onClick={toggleTheme} Icon={MdPerson} />
        </Title>
      </div>
    </div>
  );
};
