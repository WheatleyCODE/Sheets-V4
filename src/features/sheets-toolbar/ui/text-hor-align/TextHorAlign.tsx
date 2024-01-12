import { FC, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MdFormatAlignLeft } from 'react-icons/md';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { MDropdown, dropdownAnimations, usePopups } from '@/shared/ui/popups';
import { classNames } from '@/shared/lib/class-names';
import type { ITextHorAlignProps } from './TextHorAlign.interface';
import styles from './TextHorAlign.module.scss';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';
import { horAligns } from '../../model/consts/sheetsToolbar.consts';

export const TextHorAlign: FC<ITextHorAlignProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closePopup, togglePopup } = usePopups();
  const { t } = useTranslation();

  const { data, dataChangers, eventHandlers, ref } = useControllableMenu({
    items: horAligns,
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
    <div {...anotherProps} data-testid="textHorAlign" className={classNames(styles.text_hor_align, {}, [className])}>
      <Title isStopShow={isShow} onClick={togglePopup} text={t('Выравнивание по горизонтали')}>
        <Button className="r-1px" Icon={MdFormatAlignLeft} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown {...dropdownAnimations.height} closePopup={closeHandler} className={styles.dropdown}>
            <ControllableMenu
              itemsViewCount={horAligns.length}
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
