import { FC, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MdVerticalAlignBottom } from 'react-icons/md';
import { Button } from '@/shared/ui/button';
import { MDropdown, dropdownAnimations, usePopups } from '@/shared/ui/popups';
import { Title } from '@/shared/ui/title';
import { classNames } from '@/shared/lib/class-names';
import type { ITextVerAlignProps } from './TextVerAlign.interface';
import styles from './TextVerAlign.module.scss';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';
import { verAligns } from '../../model/consts/sheetsToolbar.consts';

export const TextVerAlign: FC<ITextVerAlignProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closePopup, togglePopup } = usePopups();
  const { t } = useTranslation();

  const { data, dataChangers, eventHandlers, ref } = useControllableMenu({
    items: verAligns,
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
    <div {...anotherProps} data-testid="textVerAlign" className={classNames(styles.text_ver_align, {}, [className])}>
      <Title isStopShow={isShow} text={t('Выравнивание по вертикали')}>
        <Button onClick={togglePopup} Icon={MdVerticalAlignBottom} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown {...dropdownAnimations.height} closePopup={closeHandler} className={styles.dropdown}>
            <ControllableMenu
              itemsViewCount={verAligns.length}
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
