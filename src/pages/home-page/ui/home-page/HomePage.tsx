import { FC, memo } from 'react';
import { Layout } from 'widgets/layout';
import { classNames } from 'shared/lib/class-names';
import styles from './HomePage.module.scss';

const HomePage: FC = memo(() => {
  return (
    <Layout>
      <div className={classNames(styles.home_page, {}, ['page'])}>HomePage</div>
    </Layout>
  );
});

export default HomePage;