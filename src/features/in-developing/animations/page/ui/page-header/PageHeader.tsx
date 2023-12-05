import { FC } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import type { IPageHeaderProps } from './PageHeader.interface';
import styles from './PageHeader.module.scss';
import { MdOutlineMenu } from 'react-icons/md';

export const PageHeader: FC<IPageHeaderProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <motion.div {...anotherProps} data-testid="pageHeader" className={classNames(styles.page_header, {}, [className])}>
      <div className={classNames(styles.logo_container, {}, [])}>
        <MdOutlineMenu />
        <div className={classNames(styles.logo, {}, [])}>Sheets-V4</div>
      </div>

      <div className={classNames(styles.logo_buttons, {}, [])}>
        <div className={classNames(styles.button, {}, [styles._v1])}></div>
        <div className={classNames(styles.button, {}, [styles._v2])}></div>
        <div className={classNames(styles.button, {}, [styles._v3])}></div>
      </div>
    </motion.div>
  );
};
