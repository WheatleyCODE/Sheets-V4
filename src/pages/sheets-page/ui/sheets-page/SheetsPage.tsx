import { FC, memo } from 'react';
import { SheetsFooter, SheetsFormula, SheetsHeader, SheetsTable, SheetsToolbar } from '@/widgets/sheets';
import { classNames } from '@/shared/lib/class-names';
import styles from './SheetsPage.module.scss';

const SheetsPage: FC = memo(() => {
  return (
    <section data-testid="sheetsPage" className={classNames(styles.sheets_page, {}, [])}>
      <SheetsHeader />
      <SheetsToolbar />
      <SheetsFormula />
      <SheetsTable />
      <SheetsFooter />
    </section>
  );
});

export default SheetsPage;
