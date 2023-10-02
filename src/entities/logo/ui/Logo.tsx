import { FC, memo } from 'react';
import SheetsLightIcon from 'shared/assets/icons/sheets-light.svg';
import SheetsDarkIcon from 'shared/assets/icons/sheets-dark.svg';
import { Theme, useTheme } from 'app/providers';
import { Link } from 'shared/ui/link/Link';
import { RoutesPath } from 'shared/config/route-config/routeConfig';
import { Title } from 'shared/ui/title';
import { Text } from 'shared/ui/text';
import { TextSize } from 'shared/ui/text/interface';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/class-names';
import styles from './Logo.module.scss';

interface ILogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Logo: FC<ILogoProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { theme } = useTheme();
  const { t } = useTranslation('home');

  const Icon = theme === Theme.LIGHT ? SheetsLightIcon : SheetsDarkIcon;

  return (
    <div {...anotherProps} className={classNames(styles.logo, {}, [className])}>
      <Title text={t('На главную')}>
        <Link className={styles.link} to={RoutesPath.home}>
          <Icon height={60} width={42} />
          <Text textSize={TextSize.BIG} className={styles.logo_name} title="SHEETS V4" />
        </Link>
      </Title>
    </div>
  );
});
