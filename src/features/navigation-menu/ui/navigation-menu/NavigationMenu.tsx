import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MdOutlineMenu } from 'react-icons/md';
import { NavigationMenuItem } from '../navigation-menu-item/NavigationMenuItem';
import { getNavigationItems } from '../../model/selectors/get-navigation-items/getNavigationItems';
import { Logo } from '@/entities/logo';
import { getUser } from '@/features/user';
import { Button, ButtonStyles } from '@/shared/ui/button';
import { Portal, Backdrop, Drawer, DrawerOpenStyles, useModals } from '@/shared/ui/modals';
import { HStack, VStack } from '@/shared/ui/containers';
import { Title } from '@/shared/ui/title';
import { intoIter } from '@/shared/lib/iterators';
import { classNames } from '@/shared/lib/class-names';
import type { INavigationMenuProps } from './NavigationMenu.interface';
import type { INavigationMenuItem } from '../../model/types/navigationMenu.interface';
import styles from './NavigationMenu.module.scss';

export const NavigationMenu: FC<INavigationMenuProps> = memo((props) => {
  const { className, ...anotherProps } = props;
  const isAuth = !!useSelector(getUser);
  const navigationMenu = useSelector(getNavigationItems);
  const { t } = useTranslation();
  const { isShow, openModal, closeModal } = useModals();

  const navigationLinks = intoIter<INavigationMenuItem>(navigationMenu ? navigationMenu : [])
    .filter(({ authOnly }) => (isAuth ? true : !authOnly))
    .map((item) => <NavigationMenuItem key={item.text} onClick={closeModal} item={item} />)
    .toArray();

  return (
    <aside {...anotherProps} data-testid="navigationMenu" className={classNames(styles.menu, {}, [className])}>
      {isShow ? (
        <Button className={styles.button} buttonStyle={ButtonStyles.CLEAR} Icon={MdOutlineMenu} onClick={openModal} />
      ) : (
        <Title text={t('Меню')}>
          <Button className={styles.button} buttonStyle={ButtonStyles.CLEAR} Icon={MdOutlineMenu} onClick={openModal} />
        </Title>
      )}

      <AnimatePresence>
        {isShow && (
          <Portal>
            <Backdrop onClose={closeModal}>
              <Drawer openStyles={DrawerOpenStyles.LEFT} width={300}>
                <HStack justify="start" className={styles.logo}>
                  <Logo />
                </HStack>

                <VStack role="navigation" className={styles.links}>
                  {navigationLinks}
                </VStack>
              </Drawer>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </aside>
  );
});
