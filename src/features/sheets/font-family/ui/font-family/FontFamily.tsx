import { FC, useCallback } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { fontFamilies } from '../../model/consts/fontFamily.consts';
import { Button } from '@/shared/ui/button';
import { MDropdown, dropdownAnimations, usePopups } from '@/shared/ui/popups';
import { Title } from '@/shared/ui/title';
import { AnimatePresence } from 'framer-motion';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';
import { classNames } from '@/shared/lib/class-names';
import type { IFontFamilyProps } from './FontFamily.interface';
import styles from './FontFamily.module.scss';

export const FontFamily: FC<IFontFamilyProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { t } = useTranslation();
  const { isShow, closePopup, togglePopup } = usePopups();

  const { data, dataChangers, eventHandlers, ref } = useControllableMenu({
    items: fontFamilies,
    isHorizontalReverse: true,
    onSelectItem: async () => {
      closePopup();
      dataChangers.changeMenuState(0, 0);
    },
    isDisableKeydown: !isShow,
  });

  const closeHandler = useCallback(() => {
    dataChangers.changeMenuState(0, 0);
    closePopup();
  }, [closePopup, dataChangers]);

  return (
    <div {...anotherProps} data-testid="fontFamily" className={classNames(styles.font_family, {}, [className])}>
      <Title isStopShow={isShow} text={t('Шрифт')}>
        <Button onClick={togglePopup} text={t('Шрифт')} Icon={MdArrowDropDown} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown {...dropdownAnimations.height} closePopup={closeHandler} className={styles.dropdown}>
            <ControllableMenu {...data} {...dataChangers} {...eventHandlers} menuRef={ref} />
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
