import React, { FC, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ANIMATION_DURATION } from "shared/consts/animations/animation";
import { classNames } from "shared/lib/class-names";
import styles from "./Backdrop.module.scss";

export interface IBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const Backdrop: FC<IBackdropProps> = (props) => {
  const { onClose, children, className } = props;

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
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
