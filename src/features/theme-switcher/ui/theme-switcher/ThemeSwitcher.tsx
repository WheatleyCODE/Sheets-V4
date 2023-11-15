import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { MdColorLens } from 'react-icons/md';
import { Theme, useTheme } from '@/app/providers/lib';
import { themeItems } from '../../model/consts/themeItems';
import {
  DropdownMenu,
  DropdownMenuItem,
  MDropdown,
  usePopups,
  useDropdownSubMenuAnimationFixer,
  dropdownAnimations,
} from '@/shared/ui/popups';
import { ANIMATION_DURATION_MS } from '@/shared/consts';
import { sleep } from '@/shared/lib/promise';
import { intoIter } from '@/shared/lib/iterators';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import { classNames } from '@/shared/lib/class-names';
import type { IThemeSwitcherProps } from './ThemeSwitcher.interface';
import type { IThemeItems, IThemeSubItems } from '../../model/types/themeSwitcher.interface';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher: FC<IThemeSwitcherProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closePopup, togglePopup } = usePopups();
  const { overflowStyles, close: closeDropdownHandler, onMouseEnter } = useDropdownSubMenuAnimationFixer(closePopup);
  const { setTheme } = useTheme();
  const { t } = useTranslation('home');

  const getSetTheme = (theme: Theme) => async () => {
    closeDropdownHandler();
    await sleep(ANIMATION_DURATION_MS);
    setTheme(theme);
  };

  const items = intoIter<IThemeItems>(themeItems)
    .map((item) => {
      return (
        <DropdownMenuItem key={item.text} text={t(item.text)} Icon={item.Icon}>
          {!!item.subItems && (
            <DropdownMenu>
              {intoIter<IThemeSubItems>(item.subItems)
                .map((subItem) => {
                  return (
                    <DropdownMenuItem
                      key={subItem.text}
                      onClick={getSetTheme(subItem.theme)}
                      text={t(subItem.text)}
                      Icon={subItem.Icon}
                    />
                  );
                })
                .toArray()}
            </DropdownMenu>
          )}
        </DropdownMenuItem>
      );
    })
    .toArray();

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
            closePopup={closeDropdownHandler}
            className={styles.dropdown}
          >
            <DropdownMenu>{items}</DropdownMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
