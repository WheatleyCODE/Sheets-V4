import { FC } from 'react';
import { MdFormatColorReset } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { PaletteList } from '../palette-list/PaletteList';
import { PaletteListItem } from '../palette-list-item/PaletteListItem';
import { colors } from '@/shared/consts';
import { Button } from '@/shared/ui/button';
import { classNames } from '@/shared/lib/class-names';
import type { IPaletteProps } from './Palette.interface';
import styles from './Palette.module.scss';

export const Palette: FC<IPaletteProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="palette" className={classNames(styles.palette, {}, [className])}>
      <div className={styles.list}>
        <div className={styles.title}>{t('Выбрать цвет')}</div>

        <PaletteList className={styles.list}>
          {colors.map((color) => (
            <PaletteListItem key={color.title} title={color.title} color={color.color} />
          ))}
        </PaletteList>

        <div className={styles.reset}>
          <Button className={styles.button} Icon={MdFormatColorReset} text={t('Сбросить цвет')} />
        </div>
      </div>
    </div>
  );
};
