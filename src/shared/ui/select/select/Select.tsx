import { FC, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ControllableMenu } from '../../controllable-menu';
import { Input } from '../../input';
import { ANIMATION_DURATION } from '@/shared/consts';
import { classNames } from '@/shared/lib/class-names';
import type { ISelectProps } from './Select.interface';
import styles from './Select.module.scss';

export const Select: FC<ISelectProps> = memo((props) => {
  const {
    input,
    select,
    controllableMenu,
    Icon,
    placeholder,
    isReadonly,
    selectRef,
    className,
    itemsViewCount,
    ...anotherProps
  } = props;

  return (
    <div
      {...anotherProps}
      {...select.eventHandlers}
      ref={selectRef}
      data-testid="select"
      className={classNames(styles.select, {}, [className])}
    >
      <Input
        Icon={Icon}
        type="text"
        placeholder={placeholder}
        data-testid="selectInput"
        isReadonly={isReadonly}
        {...input.data}
        {...input.eventHandlers}
        {...input.dataChangers}
        inputRef={input.ref}
      />

      <AnimatePresence>
        {input.data.isFocus && (
          <motion.div
            className={styles.select_menu}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
          >
            <ControllableMenu
              {...controllableMenu.data}
              {...controllableMenu.dataChangers}
              {...controllableMenu.eventHandlers}
              className={styles.menu}
              itemsViewCount={itemsViewCount}
              isScroll
              menuRef={controllableMenu.ref}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
