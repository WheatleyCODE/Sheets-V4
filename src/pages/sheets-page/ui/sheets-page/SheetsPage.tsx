import { FC, memo, useEffect, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/class-names';
import styles from './SheetsPage.module.scss';
import { Snackbar, useSnackbar } from '@/shared/ui/snackbar';
import { IUseClickParams } from '@/shared/lib/hooks/hooks-for-builder';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';
import { MdHome } from 'react-icons/md';

const AAA = [
  { text: 'Первый пункт', value: '1', Icon: MdHome },
  { text: 'Второй пункт', value: '2', Icon: MdHome },
  {
    text: 'Третий пункт',
    value: '3',
    Icon: MdHome,
    childrenItems: [
      { text: 'Первый под-пункт', value: '33', Icon: MdHome },
      { text: 'Второй под-пункт', value: '333', Icon: MdHome },
      { text: 'Третий под-пункт', value: '333`', Icon: MdHome },
      { text: 'Четвертый под-пункт', value: '333`1', Icon: MdHome },
      {
        text: 'Пятый под-пункт',
        value: '3333',
        Icon: MdHome,
        childrenItems: [
          { text: 'Первый под-под-пункт', value: '2-33', Icon: MdHome },
          { text: 'Второй под-под-пункт', value: '2-333', Icon: MdHome },
          { text: 'Третий под-под-пункт', value: '2-3333', Icon: MdHome },
        ],
      },
    ],
  },
  { text: 'Четвертый пункт', value: '4', Icon: MdHome },
  { text: 'Пятый пункт', value: '5', Icon: MdHome },
  { text: 'Шестой пункт', value: '6', Icon: MdHome },
  { text: 'Седьмой пункт', value: '7', Icon: MdHome },
  { text: 'Восьмой пункт', value: '8', Icon: MdHome },
];

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
    items: AAA,
    onSelectItem: (item) => console.log(item, 'select'),
  });

  return (
    <section data-testid="sheetsPage" className={classNames(styles.sheets_page, {}, [])}>
      {JSON.stringify(a)}
      <br />
      <button onClick={() => s((p) => !p)}>CLICK</button>
      <br />

      {/* {data.isShow && <Snackbar data={data} dataChangers={dataChangers} eventHandlers={eventHandlers} ref={ref} />} */}

      {/* <ControllableMenu side="right" {...data} {...dataChangers} {...eventHandlers} menuRef={ref} /> */}
    </section>
  );
});

export default SheetsPage;
