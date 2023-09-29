import { FC } from 'react';
import { Layout } from 'app/layout';
import { classNames } from 'shared/lib/class-names';
import styles from './HomePage.module.scss';

const HomePage: FC = () => {
  return (
    <Layout>
      <div className={classNames(styles.home_page, {}, ['page'])}>HomePage</div>
    </Layout>
  );
};

export default HomePage;
