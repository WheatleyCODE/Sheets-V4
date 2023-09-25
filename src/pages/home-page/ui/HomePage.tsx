import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './HomePage.module.scss';

const HomePage: FC = () => {
  return <div className={classNames(styles.home_page, {}, ['page'])}>HomePage</div>;
};

export default HomePage;
