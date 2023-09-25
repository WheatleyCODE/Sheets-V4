import { FC } from 'react';
import { classNames } from 'shared/lib/class-names';
import styles from './LandingPage.module.scss';

const LandingPage: FC = () => {
  return <div className={classNames(styles.landing_page, {}, ['page'])}>LandingPage</div>;
};

export default LandingPage;
