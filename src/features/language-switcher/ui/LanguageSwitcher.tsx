import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Title } from 'shared/ui/title';
import { Button } from 'shared/ui/button';
import { AnimatePresence } from 'framer-motion';
import { DropdownMenu, DropdownMenuItem, MDropdown } from 'shared/ui/dropdown';
import { useDropdown } from 'shared/ui/dropdown/useDropdown';
import { ANIMATION_DURATION, ANIMATION_DURATION_MS } from 'shared/consts/animations/animation';
import { useDropdownSubMenuAnimationFixer } from 'shared/ui/dropdown/useDropdownSubMenuAnimationFixer';
import { MdOutlineLanguage } from 'react-icons/md';
import { sleep } from 'shared/lib/promises';
import { intoIter } from 'shared/lib/iterators';
import { ILanguagesItems, ILanguagesSubItems, UILanguages, languageItems } from '../consts/languageItems';
import { classNames } from 'shared/lib/class-names';
import styles from './LanguageSwitcher.module.scss';

interface ILanguageSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LanguageSwitcher: FC<ILanguageSwitcherProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const { t, i18n } = useTranslation('home');
  const { isShow, closeDropdown, toggleDropdown } = useDropdown();
  const { overflowStyles, close: closeDropdownHandler, onMouseEnter } = useDropdownSubMenuAnimationFixer(closeDropdown);

  const getSetLanguage = (lang: UILanguages) => async () => {
    closeDropdownHandler();
    await sleep(ANIMATION_DURATION_MS);
    i18n.changeLanguage((i18n.language = lang));
  };

  const items = intoIter<ILanguagesItems>(languageItems)
    .map((item) => {
      return (
        <DropdownMenuItem text={t(item.text)} Icon={item.Icon}>
          {!!item.subItems && (
            <DropdownMenu>
              {intoIter<ILanguagesSubItems>(item.subItems)
                .map((subItem) => {
                  return (
                    <DropdownMenuItem
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
    <div {...anotherProps} className={classNames(styles.switcher, {}, [className])}>
      <Title isStopShow={isShow} text={t('Язык')}>
        <Button Icon={MdOutlineLanguage} onClick={toggleDropdown} text={t('Язык')} />
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
});
