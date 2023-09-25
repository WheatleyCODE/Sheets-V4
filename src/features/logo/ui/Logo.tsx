import { FC } from "react";
import SheetsLightIcon from "shared/assets/icons/sheets-light.svg";
import SheetsDarkIcon from "shared/assets/icons/sheets-dark.svg";
import { Theme } from "app/providers";
import { classNames } from "shared/lib/class-names";
import styles from "./Logo.module.scss";

interface ILogoProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: Theme;
}

export const Logo: FC<ILogoProps> = (props) => {
  const { className, theme, ...anotherProps } = props;

  const Icon = theme === Theme.LIGHT ? SheetsLightIcon : SheetsDarkIcon;

  return (
    <div {...anotherProps} className={classNames(styles.logo, {}, [className])}>
      <Icon height={60} width={50} />
    </div>
  );
};
