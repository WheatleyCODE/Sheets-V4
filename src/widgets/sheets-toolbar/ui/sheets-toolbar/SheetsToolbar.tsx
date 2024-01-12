import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
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
} from '@/features/sheets-toolbar';

export const SheetsToolbar: FC<ISheetsToolbarProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

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
    </div>
  );
});
