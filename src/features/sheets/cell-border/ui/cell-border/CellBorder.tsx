import { FC, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdBorderAll } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { borders } from '../../model/consts/cellBorder.consts';
import { Button } from '@/shared/ui/button';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';
import { MDropdown, dropdownAnimations, usePopups } from '@/shared/ui/popups';
import { Title } from '@/shared/ui/title';
import { classNames } from '@/shared/lib/class-names';
import type { ICellBorderProps } from './CellBorder.interface';
import styles from './CellBorder.module.scss';

export const CellBorder: FC<ICellBorderProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closePopup, togglePopup } = usePopups();
  const { t } = useTranslation();

  const { data, dataChangers, eventHandlers, ref } = useControllableMenu({
    items: borders,
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
    <div {...anotherProps} data-testid="cellBorder" className={classNames(styles.cell_border, {}, [className])}>
      <Title isStopShow={isShow} onClick={togglePopup} text={t('Границы')}>
        <Button Icon={MdBorderAll} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown {...dropdownAnimations.height} closePopup={closeHandler} className={styles.dropdown}>
            <ControllableMenu
              itemsViewCount={borders.length}
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
