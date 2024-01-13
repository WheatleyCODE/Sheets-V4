import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { MdAdd, MdRemove } from 'react-icons/md';
import { fontSizes } from '../../model/consts/fontSize.consts';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';
import { Button } from '@/shared/ui/button';
import { MDropdown, dropdownAnimations, usePopups } from '@/shared/ui/popups';
import { Title } from '@/shared/ui/title';
import { classNames } from '@/shared/lib/class-names';
import type { IFontSizeProps } from './FontSize.interface';
import styles from './FontSize.module.scss';

export const FontSize: FC<IFontSizeProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closePopup, togglePopup } = usePopups();
  const { t } = useTranslation();

  const { data, dataChangers, eventHandlers, ref } = useControllableMenu({
    items: fontSizes,
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
    <div {...anotherProps} data-testid="fontSize" className={classNames(styles.font_size, {}, [className])}>
      <Title text={t('Уменьшить')}>
        <Button Icon={MdRemove} />
      </Title>

      <div onClick={togglePopup} className={styles.numbers}>
        10
      </div>

      <Title text={t('Увеличить')}>
        <Button Icon={MdAdd} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown {...dropdownAnimations.height} closePopup={closeHandler} className={styles.dropdown}>
            <ControllableMenu
              isItemsCenter
              itemsViewCount={fontSizes.length}
              {...data}
              {...dataChangers}
              {...eventHandlers}
              menuRef={ref}
            />
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
