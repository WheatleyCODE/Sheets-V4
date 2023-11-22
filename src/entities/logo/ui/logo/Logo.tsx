import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@/shared/ui/link';
import { Title } from '@/shared/ui/title';
import { Text } from '@/shared/ui/text';
import { HStack } from '@/shared/ui/containers';
import { useTheme } from '@/shared/lib/hooks';
import { getRouteHome } from '@/shared/config/route-config/routeConfig';
import { SheetsDark, SheetsLight } from '@/shared/assets';
import { classNames } from '@/shared/lib/class-names';
import type { ILogoProps } from './Logo.interface';
import styles from './Logo.module.scss';

export const Logo: FC<ILogoProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { theme } = useTheme();
  const { t } = useTranslation('home');

  const Icon = theme === 'light' ? SheetsLight : SheetsDark;

  return (
    <HStack {...anotherProps} data-testid="logo" className={classNames(styles.logo, {}, [className])}>
      <Title text={t('На главную')}>
        <Link className={styles.link} to={getRouteHome()}>
          <Icon height={60} width={42} />
          <Text textSize="big" className={styles.logo_name} title="SHEETS V4" />
        </Link>
      </Title>
    </HStack>
  );
});
