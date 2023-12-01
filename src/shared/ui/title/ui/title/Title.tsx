import { FC, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDelayHover } from '@/shared/lib/hooks';
import { getForcePosition, getPosition } from './Title.helpers';
import { ANIMATION_DURATION } from '@/shared/consts';
import { classNames } from '@/shared/lib/class-names';
import type { ObjStyles, TitleProps } from './Title.interface';
import styles from './Title.module.scss';

export const Title: FC<TitleProps> = (props) => {
  const { children, text, isStopShow = false, forcePosition, className, classNameContainer, ...anotherProps } = props;
  const { isShow, onMouseEnter, onMouseLeave, onMouseMove } = useDelayHover(false, 200);
  const [objStyles, setObjStyles] = useState<ObjStyles>({});
  const titleRef = useRef<HTMLDivElement | null>(null);
  const titleTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const title = titleRef.current;
    const text = titleTextRef.current;
    if (!title || !text) return;

    if (forcePosition) {
      setObjStyles(getForcePosition(forcePosition, text));
      return;
    }

    setObjStyles(getPosition(document.body, title, text));
  }, [isShow]);

  return (
    <div
      ref={titleRef}
      data-testid="title"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={classNames(styles.title, {}, [classNameContainer])}
      {...anotherProps}
    >
      {children}

      <AnimatePresence>
        {isShow && !isStopShow && (
          <motion.div
            style={objStyles}
            ref={titleTextRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
            className={classNames(styles.title_text, {}, [className])}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
