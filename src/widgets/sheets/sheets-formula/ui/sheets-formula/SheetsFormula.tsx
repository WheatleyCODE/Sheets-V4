import { FC, memo } from 'react';
import { AiOutlineFunction } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { sheetsFormulaReducer } from '../../model/slice/sheetsFormulaSlice';
import { useSheetsFormula } from '../../model/selectors/get-sheets-formula/getSheetsFormula';
import { Icon } from '@/shared/ui/icon';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { ISheetsFormulaProps } from './SheetsFormula.interface';
import styles from './SheetsFormula.module.scss';

const reducers: ReducersList = { sheetsFormula: sheetsFormulaReducer };

export const SheetsFormula: FC<ISheetsFormulaProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers);

  const { t } = useTranslation();
  const formula = useSheetsFormula();

  console.log(formula, 'formula');

  return (
    <div {...anotherProps} data-testid="sheetsFormula" className={classNames(styles.sheets_formula, {}, [className])}>
      <div className={styles.active_cells} />
      <Icon className={styles.icon} Icon={AiOutlineFunction} />
      <input className={styles.input} type="text" />
    </div>
  );
});
