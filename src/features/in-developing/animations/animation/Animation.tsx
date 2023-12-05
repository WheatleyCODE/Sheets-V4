import { FC } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_DURATION_X2, DEFAULT_DURATION_X2_DELAY } from '../../consts/animations';
import { IoCogOutline } from 'react-icons/io5';
import { classNames } from '@/shared/lib/class-names';
import type { IAnimationProps } from './Animation.interface';
import styles from './Animation.module.scss';

const itemsArr = [1, 2, 3];

export const Animation: FC<IAnimationProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  const items = itemsArr.map((value) => (
    <div className={classNames(styles.container3, {}, [styles[`_v${value}`]])}>
      <motion.div
        animate={{ translateX: [0, 10, 0, -10, 0], translateY: [0, 6, 0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear', delay: value }}
        className={classNames(styles.container2, {}, [styles[`_v${value}`]])}
      >
        <div className={classNames(styles.container, {}, [styles[`_v${value}`]])}>
          <div className={classNames(styles.back, {}, [styles.side])}></div>
          <div className={classNames(styles.left, {}, [styles.side])}></div>
          <div className={classNames(styles.right, {}, [styles.side])}></div>
          <div className={classNames(styles.top, {}, [styles.side])}></div>
          <div className={classNames(styles.bottom, {}, [styles.side])}></div>
          <div className={classNames(styles.front, {}, [styles.side])}></div>
        </div>
      </motion.div>
    </div>
  ));

  return (
    <div {...anotherProps} data-testid="animation" className={classNames(styles.animation, {}, [className])}>
      <div className={classNames(styles.animation_children, {}, [])}>{children}</div>

      <motion.div
        initial={{ translateX: 50, translateY: 50, opacity: 0 }}
        animate={{ translateX: 0, translateY: 0, opacity: 1 }}
        transition={{ duration: DEFAULT_DURATION_X2, delay: DEFAULT_DURATION_X2_DELAY * 2 }}
        className={classNames(styles.cog_container, {}, [])}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
          className={classNames(styles.cog, {}, [styles._v1])}
        >
          <IoCogOutline />
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
          className={classNames(styles.cog, {}, [styles._v2])}
        >
          <IoCogOutline />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ translateX: -50, translateY: -50, opacity: 0 }}
        animate={{ translateX: 0, translateY: 0, opacity: 1 }}
        transition={{ duration: DEFAULT_DURATION_X2, delay: DEFAULT_DURATION_X2_DELAY * 2 }}
      >
        {items}
      </motion.div>

      <motion.h1
        initial={{ translateX: -50, translateY: -50, opacity: 0 }}
        animate={{ translateX: 0, translateY: 0, opacity: 1 }}
        transition={{ duration: DEFAULT_DURATION_X2, delay: DEFAULT_DURATION_X2_DELAY * 3 }}
        className={classNames(styles.title, {}, [])}
      >
        Страница в разработке
      </motion.h1>
    </div>
  );
};
