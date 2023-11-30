import { FC, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDelayHover } from '@/shared/lib/hooks';
import { ANIMATION_DURATION } from '@/shared/consts/animations/animation';
import { Icon as IconComponent } from '../../../../icon';
import { classNames } from '@/shared/lib/class-names';
import type { DropdownMenuItemProps } from './DropdownMenuItem.interface';
import styles from './DropdownMenuItem.module.scss';

export const DropdownMenuItem: FC<DropdownMenuItemProps> = memo((props) => {
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

      {isIcon && !!Icon && (
        <div data-testid="dropdownMenuItem-icon" className={styles.icon}>
          <IconComponent Icon={Icon} />
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
});
