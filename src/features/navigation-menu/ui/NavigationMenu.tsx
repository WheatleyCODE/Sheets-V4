import { FC, useState } from "react";
import { classNames } from "shared/lib/class-names";
import { Button, ButtonStyles } from "shared/ui/button";
import { MdOutlineMenu } from "react-icons/md";
import styles from "./NavigationMenu.module.scss";
import { Drawer, DrawerOpenStyles } from "shared/ui/drawer";
import { Portal } from "shared/ui/portal/Portal";
import { Backdrop } from "shared/ui/backdrop/Backdrop";
import { AnimatePresence } from "framer-motion";
import { navbarMenu } from "shared/consts/menus/navbarMenu";
import { Link } from "shared/ui/link";

interface INavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavigationMenu: FC<INavigationMenuProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { className, ...anotherProps } = props;

  const onClick = () => {
    setIsOpen((p) => !p);
  };

  return (
    <div {...anotherProps} className={classNames(styles.menu, {}, [className])}>
      <Button
        className={styles.button}
        buttonStyle={ButtonStyles.CLEAR}
        Icon={MdOutlineMenu}
        onClick={onClick}
      />

      <AnimatePresence>
        {isOpen && (
          <Portal>
            <Backdrop className="storage-aside" onClose={onClick}>
              <Drawer openStyles={DrawerOpenStyles.LEFT} width={300}>
                {navbarMenu.map(({ text, path }) => (
                  <Link id={path} to={path}>
                    {text}
                  </Link>
                ))}
              </Drawer>
            </Backdrop>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
};
