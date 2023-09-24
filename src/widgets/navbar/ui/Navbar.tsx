import { FC } from "react";
import { Link } from "react-router-dom";
import { routeConfig } from "shared/config/route-config/routeConfig";
import { classNames } from "shared/lib/class-names";
import styles from "./Navbar.module.scss";
import { Button } from "shared/ui/button/Button";
import { Title } from "shared/ui/title/Title";
import { MdPerson } from "react-icons/md";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleTheme: () => void;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { className, toggleTheme, ...anotherProps } = props;

  return (
    <div
      {...anotherProps}
      className={classNames(styles.navbar, {}, [className])}
    >
      <div className={styles.left_side}>
        {Object.values(routeConfig).map(({ path }) => (
          <Link to={path}>{path}</Link>
        ))}
      </div>

      <div className={styles.right_side}>
        <Title text="Сменить тему">
          <Button onClick={toggleTheme} text="Сменить тему" />
        </Title>

        <div className={styles.space} />

        <Title text="Пользователь">
          <Button onClick={toggleTheme} Icon={MdPerson} />
        </Title>
      </div>
    </div>
  );
};
