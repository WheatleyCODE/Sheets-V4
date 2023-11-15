import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { MdOutlineLanguage } from 'react-icons/md';
import { ANIMATION_DURATION_MS } from '@/shared/consts';
import { sleep } from '@/shared/lib/promise';
import { intoIter } from '@/shared/lib/iterators';
import { UILanguages, languageItems } from '../../model/consts/languageSwitcher.consts';
import { Title } from '@/shared/ui/title';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  MDropdown,
  usePopups,
  useDropdownSubMenuAnimationFixer,
  dropdownAnimations,
} from '@/shared/ui/popups';
import { classNames } from '@/shared/lib/class-names';
import type { ILanguageSwitcherProps } from './LanguageSwitcher.interface';
import type { ILanguagesItems, ILanguagesSubItems } from '../../model/types/languageSwitcher.interface';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: FC<ILanguageSwitcherProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t, i18n } = useTranslation('home');

  const { isShow, closePopup, togglePopup } = usePopups();
  const { overflowStyles, close: closeDropdownHandler, onMouseEnter } = useDropdownSubMenuAnimationFixer(closePopup);

  const getSetLanguage = (lang: UILanguages) => async () => {
    closeDropdownHandler();
    await sleep(ANIMATION_DURATION_MS);
    i18n.changeLanguage((i18n.language = lang));
  };

  const items = intoIter<ILanguagesItems>(languageItems)
    .map((item) => {
      return (
        <DropdownMenuItem key={item.text} text={t(item.text)} Icon={item.Icon}>
          {!!item.subItems && (
            <DropdownMenu>
              {intoIter<ILanguagesSubItems>(item.subItems)
                .map((subItem) => {
                  return (
                    <DropdownMenuItem
                      key={subItem.text}
                      onClick={getSetLanguage(subItem.uiLang)}
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
            closePopup={closeDropdownHandler}
            className={styles.dropdown}
          >
            <DropdownMenu>{items}</DropdownMenu>
          </MDropdown>
        )}
      </AnimatePresence>
    </div>
  );
});
