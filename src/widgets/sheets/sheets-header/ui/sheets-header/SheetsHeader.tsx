import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, useValidInput } from '@/shared/ui/input';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks';
import { sheetsHeaderReducer } from '../../model/slice/sheetsHeaderSlice';
import { useSheetsHeader } from '../../model/selectors/get-sheets-header/getSheetsHeader';
import { classNames } from '@/shared/lib/class-names';
import type { ISheetsHeaderProps } from './SheetsHeader.interface';
import styles from './SheetsHeader.module.scss';

const reducers: ReducersList = { sheetsHeader: sheetsHeaderReducer };

export const SheetsHeader: FC<ISheetsHeaderProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers);

  const header = useSheetsHeader();

  const { t } = useTranslation();
  const input = useValidInput();

  console.log(header);

  return (
    <div {...anotherProps} data-testid="sheetsHeader" className={classNames(styles.sheets_header, {}, [className])}>
      <Input
        placeholder={t('Название таблицы')}
        {...input.data}
        {...input.dataChangers}
        {...input.eventHandlers}
        inputRef={input.ref}
      />
    </div>
  );
});
