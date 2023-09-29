import { FC, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CgClose } from 'react-icons/cg';
import { ANIMATION_DURATION } from 'shared/consts/animations/animation';
import { classNames } from 'shared/lib/class-names';
import styles from './Modal.module.scss';

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  isHideCloseButton?: boolean;
}

export const Modal: FC<IModalProps> = (props) => {
  const { className, children, isHideCloseButton, onClose, ...anotherProps } = props;

  const MemoIcon = memo(CgClose);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  return (
    <motion.div
      initial={{ translateY: -30, opacity: 0, scale: 0.5 }}
      animate={{ translateY: 0, opacity: 1, scale: 1 }}
      transition={{ duration: ANIMATION_DURATION }}
      exit={{ translateY: -30, opacity: 0, scale: 0.5 }}
      onClick={stopPropagation}
      className={classNames(styles.modal, {}, [className])}
    >
      {!isHideCloseButton && (
        <div aria-hidden onClick={onClose} className={styles.close_button}>
          <MemoIcon />
        </div>
      )}

      {children}
    </motion.div>
  );
};
