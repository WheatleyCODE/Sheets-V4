import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { MdOutlineLanguage } from 'react-icons/md';
import { ANIMATION_DURATION_MS } from '@/shared/consts';
import { sleep } from '@/shared/lib/promise';
import { UILanguages, getLanguageItems } from '../../model/consts/languageSwitcher.consts';
import { Title } from '@/shared/ui/title';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';
import { Button } from '@/shared/ui/button';
import { MDropdown, usePopups, useDropdownSubMenuAnimationFixer, dropdownAnimations } from '@/shared/ui/popups';
import { classNames } from '@/shared/lib/class-names';
import type { ILanguageSwitcherProps } from './LanguageSwitcher.interface';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: FC<ILanguageSwitcherProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t, i18n } = useTranslation('home');

  // ! FIX usePopups
  const { isShow, closePopup, togglePopup } = usePopups();
  const { overflowStyles, close: closeDropdownHandler, onMouseEnter } = useDropdownSubMenuAnimationFixer(closePopup);

  const { data, dataChangers, eventHandlers, ref } = useControllableMenu({
    items: getLanguageItems(t),
    isHorizontalReverse: true,
    onSelectItem: async (item) => {
      closeDropdownHandler();

      await sleep(ANIMATION_DURATION_MS);

      // * Norm, async function =)
      dataChangers.changeMenuState(0, 0);

      if (item.value === UILanguages.RU || item.value === UILanguages.EN || item.value === UILanguages.FR) {
        i18n.changeLanguage((i18n.language = item.value));
      }
    },
    onChangeCurrentIndex: () => {
      onMouseEnter();
    },
  });

  const closeHandler = useCallback(() => {
    dataChangers.changeMenuState(0, 0);
    closeDropdownHandler();
  }, [closeDropdownHandler, dataChangers]);

  return (
    <div {...anotherProps} data-testid="languageSwitcher" className={classNames(styles.switcher, {}, [className])}>
      <Title isStopShow={isShow} text={t('Язык')}>
        <Button Icon={MdOutlineLanguage} onClick={togglePopup} text={t('Язык')} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown
            {...dropdownAnimations.height}
            style={overflowStyles}
            onMouseEnter={onMouseEnter}
            closePopup={closeHandler}
            className={styles.dropdown}
          >
            <ControllableMenu {...data} {...dataChangers} {...eventHandlers} menuRef={ref} />
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
});
