import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { MdColorLens } from 'react-icons/md';
import { getThemeItems } from '../../model/consts/themeItems.consts';
import { MDropdown, usePopups, useDropdownSubMenuAnimationFixer, dropdownAnimations } from '@/shared/ui/popups';
import { ANIMATION_DURATION_MS } from '@/shared/consts';
import { sleep } from '@/shared/lib/promise';
import { ClientSettingsAsyncEngine } from '@/shared/lib/kv-storage';
import { ControllableMenu, useControllableMenu } from '@/shared/ui/controllable-menu';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { useTheme } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import type { IThemeSwitcherProps } from './ThemeSwitcher.interface';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher: FC<IThemeSwitcherProps> = memo((props) => {
  const { className, user, ...anotherProps } = props;
  const { isShow, closePopup, togglePopup } = usePopups();
  const { overflowStyles, close: closeDropdownHandler, onMouseEnter } = useDropdownSubMenuAnimationFixer(closePopup);
  const { setTheme } = useTheme();
  const { t } = useTranslation('home');

  const { data, dataChangers, eventHandlers, ref } = useControllableMenu({
    items: getThemeItems(t),
    isHorizontalReverse: true,
    onSelectItem: async (item) => {
      closeDropdownHandler();

      await sleep(ANIMATION_DURATION_MS);

      // * Norm, async function =)
      dataChangers.changeMenuState(0, 0);

      if (item.value === 'dark' || item.value === 'light' || item.value === 'toxic') {
        if (user?.id) {
          setTheme(item.value, new ClientSettingsAsyncEngine(user.id));
        }
      }
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
    <div {...anotherProps} data-testid="themeSwitcher" className={classNames(styles.switcher, {}, [className])}>
      <Title isStopShow={isShow} text={t('Тема')}>
        <Button Icon={MdColorLens} onClick={togglePopup} text={t('Тема')} />
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
