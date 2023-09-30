import { FC } from 'react';
import { Layout } from 'widgets/layout';
import { classNames } from 'shared/lib/class-names';
import styles from './SheetsPage.module.scss';

const SheetsPage: FC = () => {
  return (
    <Layout>
      <div className={classNames(styles.sheets_page, {}, ['page'])}>SheetsPage</div>
    </Layout>
  );
};

export default SheetsPage;
