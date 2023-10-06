import { FC, ReactNode, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';
import { useDelayHover } from 'shared/lib/hooks';
import { ANIMATION_DURATION } from 'shared/consts/animations/animation';
import { classNames } from 'shared/lib/class-names';
import styles from './DropdownMenuItem.module.scss';

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  text: string;
  Icon?: IconType | 'NONE';
  onClick?: () => void;
  side?: 'left' | 'right';
}

export const DropdownMenuItem: FC<DropdownMenuItemProps> = (props) => {
  const { children, Icon, text, onClick, className, side = 'left', ...anotherProps } = props;
  const { isShow, onMouseEnter, onMouseLeave, onMouseMove } = useDelayHover(false, 400, 0);

  const onClickHandler = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick?.();
    },
    [onClick],
  );

  const isNone = Icon === 'NONE';
  const isIcon = typeof Icon === 'function';
  const MemoIcon = isIcon && memo(Icon);

  return (
    <div
      {...anotherProps}
      data-testid="dropdownMenuItem"
      onClick={onClickHandler}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={classNames(styles.item, { [styles[side]]: true }, [className])}
    >
      {isNone && <div className={styles.icon} />}

      {isIcon && !!MemoIcon && (
        <div data-testid="dropdownMenuItem-icon" className={styles.icon}>
          <MemoIcon />
        </div>
      )}

      <div className={styles.text}>{text}</div>

      <AnimatePresence>
        {children && isShow && (
          <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            className={styles.sub_menu}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
