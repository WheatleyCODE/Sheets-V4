import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import styles from './HomePage.module.scss';

const HomePage: FC = memo(() => {
  return (
    <section data-testid="homePage" className={classNames(styles.home_page, {}, ['page'])}>
      HomePage
    </section>
  );
});

export default HomePage;
