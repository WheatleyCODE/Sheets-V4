import { FC, memo, useEffect, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/class-names';
import styles from './SheetsPage.module.scss';
import { Snackbar, useSnackbar } from '@/shared/ui/snackbar';
import { IUseClickParams } from '@/shared/lib/hooks/hooks-for-builder';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';

const SheetsPage: FC = memo(() => {
  const [a, s] = useState(false);

  // const useClick: IUseClickParams<HTMLDivElement> = useMemo(() => ({ onContextMenu: () => console.log('work') }), []);

  // const { data, dataChangers, eventHandlers, ref } = useSnackbar({ useSnackbar: { useClick } });

  // useEffect(() => {
  //   console.log('data', data);
  // }, [data]);

  // useEffect(() => {
  //   console.log('dataChangers', dataChangers);
  // }, [dataChangers]);

  // useEffect(() => {
  //   console.log('eventHandlers', eventHandlers);
  // }, [eventHandlers]);

  const { data, dataChangers, eventHandlers, ref } = useControllableMenu({
    items: [
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      {
        text: '3',
        value: '3',
        childrenItems: [
          { text: '33', value: '33' },
          { text: '333', value: '333' },
          { text: '3333', value: '3333' },
        ],
      },
      { text: '4', value: '4' },
      { text: '5', value: '5' },
      { text: '6', value: '6' },
      { text: '7', value: '7' },
      { text: '8', value: '8' },
    ],
  });

  return (
    <section data-testid="sheetsPage" className={classNames(styles.sheets_page, {}, [])}>
      {JSON.stringify(a)}
      <br />
      <button onClick={() => s((p) => !p)}>CLICK</button>
      <br />

      {/* {data.isShow && <Snackbar data={data} dataChangers={dataChangers} eventHandlers={eventHandlers} ref={ref} />} */}

      <ControllableMenu {...data} {...dataChangers} {...eventHandlers} menuRef={ref} />
    </section>
  );
});

export default SheetsPage;
