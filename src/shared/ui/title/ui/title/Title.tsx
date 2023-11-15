import { FC, memo, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDelayHover } from '@/shared/lib/hooks';
import { ANIMATION_DURATION } from '@/shared/consts';
import { classNames } from '@/shared/lib/class-names';
import { TEXT_MARGIN, TEXT_HORIZONTAL_PADDINGS } from './Title.consts';
import type { ObjStyles, TitleProps } from './Title.interface';
import styles from './Title.module.scss';

export const Title: FC<TitleProps> = memo((props) => {
  const { children, text, isStopShow = false, className, classNameContainer, ...anotherProps } = props;
  const { isShow, onMouseEnter, onMouseLeave, onMouseMove } = useDelayHover(false, 200);
  const [objStyles, setObjStyles] = useState<ObjStyles>({});
  const titleRef = useRef<HTMLDivElement | null>(null);
  const titleTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const title = titleRef.current;
    const text = titleTextRef.current;
    if (!title || !text) return;

    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const textRect = text.getBoundingClientRect();
    const objStyles: ObjStyles = {};

    objStyles.top = objStyles.top = titleRect.height + TEXT_MARGIN;

    const isRight = () => TEXT_HORIZONTAL_PADDINGS + titleRect.left + textRect.width / 2 > bodyRect.width;
    const isLeft = () => textRect.width / 2 > titleRect.left;
    const isTop = () => title.offsetTop + titleRect.height + textRect.height > bodyRect.height;

    if (isRight()) {
      objStyles.right = 0;
      objStyles.left = 'initial';
    }

    if (isLeft()) {
      objStyles.left = 0;
      objStyles.right = 'initial';
    }

    // ! FIX isTop
    if (isTop()) {
      objStyles.top = -textRect.height - TEXT_MARGIN;
    }

    if (!isRight() && !isLeft()) {
      objStyles.left = titleRect.width / 2 - textRect.width / 2;
    }

    setObjStyles(objStyles);
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
});
