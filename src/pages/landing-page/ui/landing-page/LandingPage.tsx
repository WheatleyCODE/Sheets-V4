import { FC, memo } from 'react';
import { Layout } from '@/widgets/layout';
import { classNames } from '@/shared/lib/class-names';
import styles from './LandingPage.module.scss';

const LandingPage: FC = memo(() => {
  return (
    <Layout>
      <section data-testid="landingPage" className={classNames(styles.landing_page, {}, ['page'])}>
        LandingPage
      </section>
    </Layout>
  );
});

export default LandingPage;
