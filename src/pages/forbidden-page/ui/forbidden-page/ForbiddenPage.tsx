import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/widgets/layout';
import { Text } from '@/shared/ui/text';
import { Link } from '@/shared/ui/link';
import { RoutesPath } from '@/shared/config/route-config/routeConfig';
import { RWidth, VStack } from '@/shared/ui/containers';
import { classNames } from '@/shared/lib/class-names';
import styles from './ForbiddenPage.module.scss';

const ForbiddenPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section data-testid="forbiddenPage" className={classNames(styles.forbidden_page)}>
        <RWidth>
          <VStack>
            <Text textStyle="error" title={t('У вас нет доступа к этой странице')} />

            <Link to={RoutesPath.home}>
              <Text text={t('Перейти на главную страницу')} />
            </Link>
          </VStack>
        </RWidth>
      </section>
    </Layout>
  );
};

export default ForbiddenPage;
