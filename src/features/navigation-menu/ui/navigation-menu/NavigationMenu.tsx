import { FC, memo, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button, ButtonStyles } from 'shared/ui/button';
import { MdOutlineMenu } from 'react-icons/md';
import { Drawer, DrawerOpenStyles } from 'shared/ui/drawer';
import { Portal } from 'shared/ui/portal/Portal';
import { Backdrop } from 'shared/ui/backdrop/Backdrop';
import { navigationMenu, INavigationMenuItem } from '../../consts/navigationMenu';
import { Title } from 'shared/ui/title';
import { intoIter } from 'shared/lib/iterators';
import { NavigationMenuItem } from '../navigation-menu-item/NavigationMenuItem';
import { Logo } from 'entities/logo';
import { classNames } from 'shared/lib/class-names';
import styles from './NavigationMenu.module.scss';

interface INavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavigationMenu: FC<INavigationMenuProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navigationLinks = intoIter<INavigationMenuItem>(navigationMenu)
    .map((item) => <NavigationMenuItem onClick={closeMenu} item={item} />)
    .toArray();

  return (
    <div {...anotherProps} className={classNames(styles.menu, {}, [className])}>
      {isOpen ? (
        <Button className={styles.button} buttonStyle={ButtonStyles.CLEAR} Icon={MdOutlineMenu} onClick={openMenu} />
      ) : (
        <Title text={t('Меню')}>
          <Button className={styles.button} buttonStyle={ButtonStyles.CLEAR} Icon={MdOutlineMenu} onClick={openMenu} />
        </Title>
      )}

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <Backdrop onClose={closeMenu}>
              <Drawer openStyles={DrawerOpenStyles.LEFT} width={300}>
                <div className={styles.logo}>
                  <Logo />
                </div>
                <div className={styles.links}>{navigationLinks}</div>
              </Drawer>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
});
