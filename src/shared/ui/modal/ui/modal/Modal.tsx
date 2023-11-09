import { FC, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CgClose } from 'react-icons/cg';
import { Icon } from '../../../icon';
import { ANIMATION_DURATION } from 'shared/consts/animations/animation';
import { classNames } from 'shared/lib/class-names';
import type { IModalProps } from './Modal.interface';
import styles from './Modal.module.scss';

export const Modal: FC<IModalProps> = (props) => {
  const { className, children, isHideCloseButton, onClose } = props;

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [onClose]);

  return (
    <motion.div
      data-testid="modal"
      initial={{ translateY: -30, opacity: 0, scale: 0.5 }}
      animate={{ translateY: 0, opacity: 1, scale: 1 }}
      transition={{ duration: ANIMATION_DURATION }}
      exit={{ translateY: -30, opacity: 0, scale: 0.5 }}
      onClick={stopPropagation}
      className={classNames(styles.modal, {}, [className])}
    >
      {!isHideCloseButton && (
        <div data-testid="modal-close-button" aria-hidden onClick={onClose} className={styles.close_button}>
          <Icon Icon={CgClose} />
        </div>
      )}

      {children}
    </motion.div>
  );
};
