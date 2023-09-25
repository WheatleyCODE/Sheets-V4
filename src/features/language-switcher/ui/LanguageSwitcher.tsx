import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Title } from "shared/ui/title";
import { Button } from "shared/ui/button";
import { classNames } from "shared/lib/class-names";
import styles from "./LanguageSwitcher.module.scss";

interface ILanguageSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LanguageSwitcher: FC<ILanguageSwitcherProps> = (props) => {
  const { className, ...anotherProps } = props;

  const { t, i18n } = useTranslation("home");

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <div
      {...anotherProps}
      className={classNames(styles.switcher, {}, [className])}
    >
      <Title text={t("Сменить язык")}>
        <Button onClick={toggleLanguage} text={t("Сменить язык")} />
      </Title>
    </div>
  );
};
