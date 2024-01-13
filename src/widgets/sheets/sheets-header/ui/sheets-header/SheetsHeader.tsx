import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/class-names';
import type { ISheetsHeaderProps } from './SheetsHeader.interface';
import styles from './SheetsHeader.module.scss';
import { Input, useValidInput } from '@/shared/ui/input';

export const SheetsHeader: FC<ISheetsHeaderProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();
  const input = useValidInput();

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
