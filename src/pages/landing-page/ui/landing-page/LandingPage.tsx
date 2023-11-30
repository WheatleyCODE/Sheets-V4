import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import styles from './LandingPage.module.scss';

const LandingPage: FC = memo(() => {
  return (
    <section data-testid="landingPage" className={classNames(styles.landing_page, {}, ['page'])}>
      LandingPage
    </section>
  );
});

export default LandingPage;
