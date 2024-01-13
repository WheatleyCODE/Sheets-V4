import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MdFormatColorText } from 'react-icons/md';
import { MDropdown, dropdownAnimations, usePopups } from '@/shared/ui/popups';
import { Palette } from '@/entities/palette';
import { Button } from '@/shared/ui/button';
import { Title } from '@/shared/ui/title';
import { classNames } from '@/shared/lib/class-names';
import type { ITextColorProps } from './TextColor.interface';
import styles from './TextColor.module.scss';

export const TextColor: FC<ITextColorProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closePopup, togglePopup } = usePopups();
  const { t } = useTranslation();

  return (
    <div {...anotherProps} data-testid="textColor" className={classNames(styles.text_color, {}, [className, 'r-1px'])}>
      <Title isStopShow={isShow} text={t('Цвет текста')}>
        <Button onClick={togglePopup} className="r-1px" Icon={MdFormatColorText} />
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
