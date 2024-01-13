import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdFormatColorFill } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { Palette } from '@/entities/palette';
import { MDropdown, dropdownAnimations, usePopups } from '@/shared/ui/popups';
import { Title } from '@/shared/ui/title';
import { classNames } from '@/shared/lib/class-names';
import type { ICellBgColorProps } from './CellBgColor.interface';
import styles from './CellBgColor.module.scss';

export const CellBgColor: FC<ICellBgColorProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closePopup, togglePopup } = usePopups();
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="cellBgColor" className={classNames(styles.cell_bg_color, {}, [className])}>
      <Title isStopShow={isShow} text={t('Цвет заливки')}>
        <Button onClick={togglePopup} Icon={MdFormatColorFill} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown {...dropdownAnimations.height} closePopup={closePopup} className={styles.dropdown}>
            <Palette />
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
