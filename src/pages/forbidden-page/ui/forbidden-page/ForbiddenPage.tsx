import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/text';
import { Link } from '@/shared/ui/link';
import { getRouteHome } from '@/shared/config/route-config/routeConfig';
import { RWidth, VStack } from '@/shared/ui/containers';
import { classNames } from '@/shared/lib/class-names';
import styles from './ForbiddenPage.module.scss';

const ForbiddenPage: FC = memo(() => {
  const { t } = useTranslation();

  return (
    <section data-testid="forbiddenPage" className={classNames(styles.forbidden_page)}>
      <RWidth>
        <VStack>
          <Text textStyle="error" title={t('У вас нет доступа к этой странице')} />

          <Link to={getRouteHome()}>
            <Text text={t('Перейти на главную страницу')} />
          </Link>
        </VStack>
      </RWidth>
    </section>
  );
});

export default ForbiddenPage;
