import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';
import { MdList } from 'react-icons/md';
import { MdOutlineSettings } from 'react-icons/md';
import { sheetsFooterReducer } from '../../model/slice/sheetsFooterSlice';
import { useSheetsFooter } from '../../model/selectors/get-sheets-footer/getSheetsFooter';
import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { ISheetsFooterProps } from './SheetsFooter.interface';
import styles from './SheetsFooter.module.scss';

const reducers: ReducersList = { sheetsFooter: sheetsFooterReducer };

export const SheetsFooter: FC<ISheetsFooterProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  useDynamicModule(reducers);

  const { t } = useTranslation();
  const footer = useSheetsFooter();

  console.log(footer, 'footer');

  return (
    <div {...anotherProps} data-testid="sheetsFooter" className={classNames(styles.sheets_footer, {}, [className])}>
      <Title text={t('Добавить лист')}>
        <Button className="r-1px" Icon={MdAdd} />
      </Title>

      <Title text={t('Все листы')}>
        <Button Icon={MdList} />
      </Title>

      <Title text="Лист 1">
        <Button text="Лист 1" />
      </Title>

      <Title text={t('Добавить лист')}>
        <Button Icon={MdOutlineSettings} />
      </Title>
    </div>
  );
});
