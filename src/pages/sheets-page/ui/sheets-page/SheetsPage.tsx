import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { SheetsHeader } from '@/widgets/sheets-header';
import { SheetsToolbar } from '@/widgets/sheets-toolbar';
import { SheetsFormula } from '@/widgets/sheets-formula';
import { SheetsTable } from '@/widgets/sheets-table';
import { SheetsFooter } from '@/widgets/sheets-footer';
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
