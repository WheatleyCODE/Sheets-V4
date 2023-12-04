import { FC } from 'react';
import { classNames } from '@/shared/lib/class-names';
import { motion } from 'framer-motion';
import { IoCogOutline } from 'react-icons/io5';
import type { IAnimationProps } from './Animation.interface';
import styles from './Animation.module.scss';

export const Animation: FC<IAnimationProps> = (props) => {
  const { className, children, ...anotherProps } = props;

  return (
    <div {...anotherProps} data-testid="animation" className={classNames(styles.animation, {}, [className])}>
      <div className={classNames(styles.animation_children, {}, [])}>{children}</div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
        className={classNames(styles.cog, {}, [])}
      >
        <IoCogOutline />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
        className={classNames(styles.cog_shadow, {}, [])}
      >
        <IoCogOutline />
      </motion.div>

      <div className={classNames(styles.mech, {}, [])}>
        <div className={classNames(styles.mech_element, {}, [styles._v1])}></div>
        <div className={classNames(styles.mech_element, {}, [styles._v2])}></div>
      </div>

      <h1 className={classNames(styles.title, {}, [])}>Страница в разработке</h1>
    </div>
  );
};
