import React, { FC, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_DURATION } from '@/shared/consts/animations/animation';
import { useGlobalKeydown } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/class-names';
import { IBackdropProps } from './Backdrop.interface';
import styles from './Backdrop.module.scss';

export const Backdrop: FC<IBackdropProps> = (props) => {
  const { onClose, children, className } = props;

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    },
    [onClose],
  );

  useGlobalKeydown({ Escape: [onClose] });

  return (
    <motion.div
      data-testid="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: ANIMATION_DURATION }}
      aria-hidden
      onClick={onClick}
      onContextMenu={onClick}
      className={classNames(styles.backdrop, {}, [className])}
    >
      {children}
    </motion.div>
  );
};
