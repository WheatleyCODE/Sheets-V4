import { FC, memo, useEffect, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/class-names';
import styles from './SheetsPage.module.scss';
import { Snackbar, useSnackbar } from '@/shared/ui/snackbar';
import { IUseClickParams } from '@/shared/lib/hooks/hooks-for-builder';

const SheetsPage: FC = memo(() => {
  const [a, s] = useState(false);

  const useClick: IUseClickParams<HTMLDivElement> = useMemo(() => ({ onContextMenu: () => console.log('work') }), []);

  const { data, dataChangers, eventHandlers, ref } = useSnackbar({ useSnackbar: { useClick } });

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  useEffect(() => {
    console.log('dataChangers', dataChangers);
  }, [dataChangers]);

  useEffect(() => {
    console.log('eventHandlers', eventHandlers);
  }, [eventHandlers]);

  return (
    <section data-testid="sheetsPage" className={classNames(styles.sheets_page, {}, [])}>
      {JSON.stringify(a)}
      <br />
      <button onClick={() => s((p) => !p)}>CLICK</button>
      <br />

      {data.isShow && <Snackbar data={data} dataChangers={dataChangers} eventHandlers={eventHandlers} ref={ref} />}
    </section>
  );
});

export default SheetsPage;
