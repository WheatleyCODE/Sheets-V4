import { FC, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MdOutlineMenu } from 'react-icons/md';
import { NavigationMenuItem } from '../navigation-menu-item/NavigationMenuItem';
import { INavigationMenuItem } from '../../model/types/navigation';
import { getNavigationItems } from '../../model/selectors/get-navigation-items/getNavigationItems';
import { Logo } from 'entities/logo';
import { getUser } from 'entities/user';
import { Button, ButtonStyles } from 'shared/ui/button';
import { Drawer, DrawerOpenStyles } from 'shared/ui/drawer';
import { Portal } from 'shared/ui/portal';
import { Backdrop } from 'shared/ui/backdrop';
import { HStack, VStack } from 'shared/ui/containers';
import { Title } from 'shared/ui/title';
import { intoIter } from 'shared/lib/iterators';
import { classNames } from 'shared/lib/class-names';
import styles from './NavigationMenu.module.scss';

interface INavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavigationMenu: FC<INavigationMenuProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const isAuth = !!useSelector(getUser);
  const navigationMenu = useSelector(getNavigationItems);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navigationLinks = intoIter<INavigationMenuItem>(navigationMenu ? navigationMenu : [])
    .filter(({ authOnly }) => (isAuth ? true : !authOnly))
    .map((item) => <NavigationMenuItem key={item.text} onClick={closeMenu} item={item} />)
    .toArray();

  return (
    <menu {...anotherProps} data-testid="navigationMenu" className={classNames(styles.menu, {}, [className])}>
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
                <HStack justify="start" className={styles.logo}>
                  <Logo />
                </HStack>
                <VStack className={styles.links}>{navigationLinks}</VStack>
              </Drawer>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </menu>
  );
});
