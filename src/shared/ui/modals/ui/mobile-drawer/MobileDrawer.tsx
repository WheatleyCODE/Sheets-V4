import { FC, useCallback } from 'react';
import { PanInfo, motion, useDragControls } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import { ANIMATION_DURATION } from '@/shared/consts';
import { VStack } from '../../../containers';
import type { IMobileDrawerProps } from './MobileDrawer.interface';
import styles from './MobileDrawer.module.scss';

export const MobileDrawer: FC<IMobileDrawerProps> = (props) => {
  const { className, maxChange = 200, translateY = 300, onClose, children, ...anotherProps } = props;
  const controls = useDragControls();

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.y > maxChange) {
        onClose();
        return;
      }
    },
    [onClose, maxChange],
  );

  return (
    <motion.div
      initial={{ translateY }}
      onDragEnd={onDragEnd}
      dragConstraints={{
        top: 0,
        bottom: 100,
      }}
      animate={{ translateY: 0 }}
      exit={{ translateY }}
      dragControls={controls}
      dragSnapToOrigin
      drag="y"
      transition={{ duration: ANIMATION_DURATION }}
      aria-hidden
      className={classNames(styles.mobile_drawer, {}, [className])}
      data-testid="mobileDrawer"
    >
      <VStack {...anotherProps}>{children}</VStack>
    </motion.div>
  );
};
