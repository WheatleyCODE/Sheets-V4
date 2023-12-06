import { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import { FaGithub, FaTelegramPlane } from 'react-icons/fa';
import type { IGithubWidgetProps } from './GithubWidget.interface';
import styles from './GithubWidget.module.scss';
import { DEFAULT_DURATION } from '../../consts/animations';

const itemsArr = [{ Icon: FaGithub }, { Icon: FaTelegramPlane }];

export const GithubWidget: FC<IGithubWidgetProps> = (props) => {
  const { className, ...anotherProps } = props;
  const [isShow, setIsShow] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (isHover) return;
    const interval = setInterval(() => setIsShow((p) => !p), 5000);

    return () => {
      clearInterval(interval);
    };
  }, [isHover]);

  const items = itemsArr.map(({ Icon }) => (
    <motion.div
      initial={{ translateX: -110, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 110, opacity: 0 }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      transition={{ duration: DEFAULT_DURATION }}
      className={classNames(styles.git_icon, {}, [])}
    >
      <Icon />
    </motion.div>
  ));

  return (
    <motion.div
      {...anotherProps}
      data-testid="githubWidget"
      className={classNames(styles.github_widget, {}, [className])}
    >
      <div className={classNames(styles.square, {}, [styles._v1])}>
        <AnimatePresence>{isShow && items[0]}</AnimatePresence>
        <AnimatePresence>{!isShow && items[1]}</AnimatePresence>
        <div className={classNames(styles.tab, {}, [])}></div>
      </div>
      <div className={classNames(styles.square, {}, [styles._v2])}></div>
      <div className={classNames(styles.square, {}, [styles._v3])}></div>
    </motion.div>
  );
};
