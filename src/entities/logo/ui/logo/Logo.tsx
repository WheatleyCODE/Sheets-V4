import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Theme, useTheme } from 'app/providers/lib';
import { Link } from 'shared/ui/link';
import { RoutesPath } from 'shared/config/route-config/routeConfig';
import { Title } from 'shared/ui/title';
import { Text } from 'shared/ui/text';
import { TextSize } from 'shared/ui/text';
import { HStack } from 'shared/ui/containers';
import { SheetsDark, SheetsLight } from 'shared/assets';
import { classNames } from 'shared/lib/class-names';
import type { ILogoProps } from './Logo.interface';
import styles from './Logo.module.scss';

export const Logo: FC<ILogoProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { theme } = useTheme();
  const { t } = useTranslation('home');

  const Icon = theme === Theme.LIGHT ? SheetsLight : SheetsDark;

  return (
    <HStack {...anotherProps} data-testid="logo" className={classNames(styles.logo, {}, [className])}>
      <Title text={t('На главную')}>
        <Link className={styles.link} to={RoutesPath.home}>
          <Icon height={60} width={42} />
          <Text textSize={TextSize.BIG} className={styles.logo_name} title="SHEETS V4" />
        </Link>
      </Title>
    </HStack>
  );
});
