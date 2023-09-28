import { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, ButtonStyles } from 'shared/ui/button';
import { MdOutlineMenu } from 'react-icons/md';
import { Drawer, DrawerOpenStyles } from 'shared/ui/drawer';
import { Portal } from 'shared/ui/portal/Portal';
import { Backdrop } from 'shared/ui/backdrop/Backdrop';
import { navbarMenu, INavbarMenuItem } from 'shared/consts/menus/navbarMenu';
import { Link } from 'shared/ui/link';
import { TFunction } from 'i18next';
import { Title } from 'shared/ui/title';
import { intoIter } from 'shared/lib/iterators';
import { classNames } from 'shared/lib/class-names';
import styles from './NavigationMenu.module.scss';

interface INavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  t: TFunction<'home'>;
}

export const NavigationMenu: FC<INavigationMenuProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { className, t, ...anotherProps } = props;

  const onClick = () => {
    setIsOpen((p) => !p);
  };

  const navbarLinks = intoIter<INavbarMenuItem>(navbarMenu)
    .map(({ text, path }) => (
      <Link id={path} to={path}>
        {t(text)}
      </Link>
    ))
    .toArray();

  return (
    <div {...anotherProps} className={classNames(styles.menu, {}, [className])}>
      {isOpen ? (
        <Button className={styles.button} buttonStyle={ButtonStyles.CLEAR} Icon={MdOutlineMenu} onClick={onClick} />
      ) : (
        <Title text={t('Меню')}>
          <Button className={styles.button} buttonStyle={ButtonStyles.CLEAR} Icon={MdOutlineMenu} onClick={onClick} />
        </Title>
      )}

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <Backdrop className="storage-aside" onClose={onClick}>
              <Drawer openStyles={DrawerOpenStyles.LEFT} width={300}>
                {navbarLinks}
              </Drawer>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
};
