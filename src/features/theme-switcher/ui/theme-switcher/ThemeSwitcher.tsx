import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { MdColorLens } from 'react-icons/md';
import { Theme, useTheme } from 'app/providers/lib/theme-context';
import { IThemeItems, IThemeSubItems, themeItems } from '../../model/consts/themeItems';
import { DropdownMenu, DropdownMenuItem, MDropdown } from 'shared/ui/dropdown';
import { useDropdown } from 'shared/ui/dropdown';
import { ANIMATION_DURATION, ANIMATION_DURATION_MS } from 'shared/consts';
import { useDropdownSubMenuAnimationFixer } from 'shared/ui/dropdown';
import { sleep } from 'shared/lib/promises';
import { intoIter } from 'shared/lib/iterators';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { classNames } from 'shared/lib/class-names';
import styles from './ThemeSwitcher.module.scss';

interface IThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ThemeSwitcher: FC<IThemeSwitcherProps> = (props) => {
  const { className, ...anotherProps } = props;
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();
  const { overflowStyles, close: closeDropdownHandler, onMouseEnter } = useDropdownSubMenuAnimationFixer(closeDropdown);
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
    <div {...anotherProps} className={classNames(styles.switcher, {}, [className])}>
      <Title isStopShow={isShow} text={t('Тема')}>
        <Button Icon={MdColorLens} onClick={toggleDropdown} text={t('Тема')} />
      </Title>

      <AnimatePresence>
        {isShow && (
          <MDropdown
            style={overflowStyles}
            onMouseEnter={onMouseEnter}
            exit={{ height: 0 }}
            animate={{ height: 'auto' }}
            initial={{ height: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            closeDropdown={closeDropdownHandler}
            className={styles.dropdown}
          >
            <DropdownMenu>{items}</DropdownMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
};