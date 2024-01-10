import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import styles from './SheetsPage.module.scss';

const SheetsPage: FC = memo(() => {
  return (
    <section data-testid="sheetsPage" className={classNames(styles.sheets_page, {}, [])}>
      <h1>Sheets</h1>
    </section>
  );
});

export default SheetsPage;
