import { FC, memo } from 'react';
import { Layout } from '@/widgets/layout';
import { classNames } from '@/shared/lib/class-names';
import styles from './SheetsPage.module.scss';

const SheetsPage: FC = memo(() => {
  return (
    <Layout>
      <section data-testid="sheetsPage" className={classNames(styles.sheets_page, {}, ['page'])}>
        SheetsPage
      </section>
    </Layout>
  );
});

export default SheetsPage;
