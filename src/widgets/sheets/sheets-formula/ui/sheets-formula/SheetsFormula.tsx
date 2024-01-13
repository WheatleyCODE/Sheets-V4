import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import type { ISheetsFormulaProps } from './SheetsFormula.interface';
import styles from './SheetsFormula.module.scss';
import { Icon } from '@/shared/ui/icon';
import { AiOutlineFunction } from 'react-icons/ai';

export const SheetsFormula: FC<ISheetsFormulaProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="sheetsFormula" className={classNames(styles.sheets_formula, {}, [className])}>
      <div className={styles.active_cells} />
      <Icon className={styles.icon} Icon={AiOutlineFunction} />
      <input className={styles.input} type="text" />
    </div>
  );
});
