import { FC } from "react";
import { MdPerson } from "react-icons/md";
import { Button } from "shared/ui/button/Button";
import { Link } from "shared/ui/link/Link";
import { Title } from "shared/ui/title/Title";
import { classNames } from "shared/lib/class-names";
import { navbarMenu } from "shared/consts/menus/navbarMenu";
import { ThemeSwitcher } from "features/theme-switcher/ui/ThemeSwitcher";
import styles from "./Navbar.module.scss";
import { Logo } from "features/logo/ui/Logo";
import { useTheme } from "app/providers";

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
        <Logo theme={theme} />
        {navbarMenu.map(({ text, path }) => (
          <Link id={path} to={path}>
            {text}
          </Link>
        ))}
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
