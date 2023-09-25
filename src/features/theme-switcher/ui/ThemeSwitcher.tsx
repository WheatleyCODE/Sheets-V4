import { FC } from "react";
import { Title } from "shared/ui/title/Title";
import { Button } from "shared/ui/button/Button";
import { classNames } from "shared/lib/class-names";
import styles from "./ThemeSwitcher.module.scss";

interface IThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleTheme: () => void;
}

export const ThemeSwitcher: FC<IThemeSwitcherProps> = (props) => {
  const { className, toggleTheme, ...anotherProps } = props;

  return (
    <div
      {...anotherProps}
      className={classNames(styles.switcher, {}, [className])}
    >
      <Title text="Сменить тему">
        <Button onClick={toggleTheme} text="Сменить тему" />
      </Title>
    </div>
  );
};
