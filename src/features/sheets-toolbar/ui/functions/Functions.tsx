import { FC, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MdFunctions } from 'react-icons/md';
import { functions } from '../../model/consts/sheetsToolbar.consts';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { MDropdown, dropdownAnimations, useDropdownSubMenuAnimationFixer, usePopups } from '@/shared/ui/popups';
import { classNames } from '@/shared/lib/class-names';
import type { IFunctionsProps } from './Functions.interface';
import styles from './Functions.module.scss';

export const Functions: FC<IFunctionsProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closePopup, togglePopup } = usePopups();
  const { overflowStyles, close: closeDropdownHandler, onMouseEnter } = useDropdownSubMenuAnimationFixer(closePopup);

  const { t } = useTranslation();

  const { data, dataChangers, eventHandlers, ref } = useControllableMenu({
    items: functions,
    isHorizontalReverse: true,
    onSelectItem: async () => {
      closeDropdownHandler();
      dataChangers.changeMenuState(0, 0);
    },
    onChangeCurrentIndex: () => {
      onMouseEnter();
    },
    isDisableKeydown: !isShow,
  });

  const closeHandler = useCallback(() => {
    dataChangers.changeMenuState(0, 0);
    closeDropdownHandler();
  }, [closeDropdownHandler, dataChangers]);

  return (
    <div {...anotherProps} data-testid="functions" className={classNames(styles.functions, {}, [className])}>
      <Title isStopShow={isShow} text={t('Формулы')}>
        <Button onClick={togglePopup} Icon={MdFunctions} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown
            style={overflowStyles}
            onMouseEnter={onMouseEnter}
            {...dropdownAnimations.height}
            closePopup={closeHandler}
            className={styles.dropdown}
          >
            <ControllableMenu
              itemsViewCount={functions.length}
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
