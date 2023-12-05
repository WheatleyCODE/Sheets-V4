import { FC } from 'react';
import { motion } from 'framer-motion';
import { MdClose, MdRefresh, MdArrowBack, MdOutlineHome } from 'react-icons/md';
import { classNames } from '@/shared/lib/class-names';
import type { IBrowserHeaderProps } from './BrowserHeader.interface';
import styles from './BrowserHeader.module.scss';

export const BrowserHeader: FC<IBrowserHeaderProps> = (props) => {
  const { className, ...anotherProps } = props;

  return (
    <motion.div
      {...anotherProps}
      data-testid="browserHeader"
      className={classNames(styles.browser_header, {}, [className])}
    >
      <div className={classNames(styles.browser_tabs, {}, [])}>
        <div className={classNames(styles.browser_tab, {}, [])}>
          <div className={classNames(styles.browser_tab_name, {}, [])}>YouTube</div>

          <div className={classNames(styles.browser_tab_close, {}, [])}>
            <MdClose className={classNames(styles.browser_tab_close_icon, {}, [])} />
          </div>
        </div>

        <div className={classNames(styles.browser_tab, {}, [])}>
          <div className={classNames(styles.browser_tab_name, {}, [])}>Sheets V4</div>
          <div className={classNames(styles.browser_tab_close, {}, [])}>
            <MdClose className={classNames(styles.browser_tab_close_icon, {}, [])} />
          </div>
        </div>
      </div>

      <div className={classNames(styles.browser_panel, {}, [])}>
        <div className={classNames(styles.browser_panel_buttons, {}, [])}>
          <div className={classNames(styles.browser_panel_left, {}, [])}>
            <MdArrowBack />
          </div>
          <div className={classNames(styles.browser_panel_right, {}, [])}>
            <MdArrowBack />
          </div>
          <div className={classNames(styles.browser_panel_refresh, {}, [])}>
            <MdRefresh />
          </div>
          <div className={classNames(styles.browser_panel_home, {}, [])}>
            <MdOutlineHome />
          </div>
        </div>

        <div className={classNames(styles.browser_panel_url, {}, [])}>http://sheets-v4/admin/panel</div>
      </div>
    </motion.div>
  );
};
