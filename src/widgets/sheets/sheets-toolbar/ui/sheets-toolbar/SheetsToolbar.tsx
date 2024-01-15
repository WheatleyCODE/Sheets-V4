import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { sheetsToolbarReducer } from '../../model/slice/sheetsToolbarSlice';
import { useSheetsToolbar } from '../../model/selectors/get-sheets-toolbar/getSheetsToolbar';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { ISheetsToolbarProps } from './SheetsToolbar.interface';
import styles from './SheetsToolbar.module.scss';
import {
  CellBgColor,
  FontFamily,
  CellBorder,
  FontSize,
  TextColor,
  TextHorAlign,
  TextStyle,
  TextVerAlign,
  UndoRedo,
  Functions,
} from '@/features/sheets';

const reducers: ReducersList = { sheetsToolbar: sheetsToolbarReducer };

export const SheetsToolbar: FC<ISheetsToolbarProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers);

  const toolbar = useSheetsToolbar();
  const { t } = useTranslation();

  console.log(toolbar, 'toolbar');

  return (
    <div {...anotherProps} data-testid="sheetsToolbar" className={classNames(styles.sheets_toolbar, {}, [className])}>
      <UndoRedo />
      <div className={styles.gap} />
      <FontFamily />
      <div className={styles.gap} />
      <FontSize />
      <div className={styles.gap} />
      <TextStyle />
      <div className={styles.gap} />
      <TextColor />
      <CellBgColor />
      <div className={styles.gap} />
      <CellBorder />
      <div className={styles.gap} />
      <TextHorAlign />
      <TextVerAlign />
      <div className={styles.gap} />
      <Functions />
    </div>
  );
});
