import { FC } from 'react';
import SheetsLightIcon from 'shared/assets/icons/sheets-light.svg';
import SheetsDarkIcon from 'shared/assets/icons/sheets-dark.svg';
import { Theme } from 'app/providers';
import { classNames } from 'shared/lib/class-names';
import styles from './Logo.module.scss';
import { Link } from 'shared/ui/link/Link';
import { RoutesPath } from 'shared/config/route-config/routeConfig';
import { Title } from 'shared/ui/title';
import { TFunction } from 'i18next';

interface ILogoProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: Theme;
  t: TFunction<'home'>;
}

export const Logo: FC<ILogoProps> = (props) => {
  const { className, theme, t, ...anotherProps } = props;

  const Icon = theme === Theme.LIGHT ? SheetsLightIcon : SheetsDarkIcon;

  return (
    <div {...anotherProps} className={classNames(styles.logo, {}, [className])}>
      <Title text={t('На главную')}>
        <Link className={styles.link} to={RoutesPath.home}>
          <Icon height={50} width={45} />
          <h1 className={styles.logo_name}>SHEETS</h1>
        </Link>
      </Title>
    </div>
  );
};
