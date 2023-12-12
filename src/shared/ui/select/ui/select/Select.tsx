import { FC, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import { Input, useValidInput } from '../../../input';
import type { ISelectProps } from './Select.interface';
import styles from './Select.module.scss';
import { intoIter } from '@/shared/lib/iterators';
import { ANIMATION_DURATION } from '@/shared/consts';
import { SELECT_MENU_ITEM_HEIGHT, SELECT_MENU_PADDING } from './Select.consts';
import { ControllableMenu, IControllableMenuItem } from '../../../controllable-menu';
import { useControllableMenu } from '../../../controllable-menu/ui/controllable-menu/ControllableMenu.hooks';

export const Select: FC<ISelectProps> = memo((props) => {
  const {
    className,
    itemsViewCount = 4,
    isSearch,
    Icon,
    placeholder,
    items,
    isForbidInput,
    isReadonly,
    ...anotherProps
  } = props;

  const { data, handlers } = useValidInput({ input: { initialValue: '' } });

  let itemsArr = intoIter<IControllableMenuItem>(items);

  if (isSearch) {
    itemsArr = itemsArr.filter((item) => item.text.toLowerCase().includes(data.value.toLowerCase()));
  }

  const maxHeight = itemsViewCount * SELECT_MENU_ITEM_HEIGHT + SELECT_MENU_PADDING * 2;

  const arr = itemsArr.toArray();

  const { data: menuData, handlers: menuHandlers } = useControllableMenu({
    controllableMenu: {
      items: arr,
      onChangeIndex(item) {
        console.log(item);
      },
      isRefreshIndex: true,
    },
  });

  return (
    <div {...anotherProps} data-testid="select" className={classNames(styles.select, {}, [className])}>
      <Input
        Icon={Icon}
        type="text"
        placeholder={placeholder}
        data-testid="selectInput"
        isReadonly={isReadonly}
        {...data}
        {...handlers}
        onChange={isForbidInput ? () => {} : handlers.onChange}
      />

      <AnimatePresence>
        {data.isFocus && (
          <motion.div
            className={styles.select_menu}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
          >
            <div
              style={{ maxHeight, paddingTop: SELECT_MENU_PADDING, paddingBottom: SELECT_MENU_PADDING }}
              className={styles.select_items}
            >
              <ControllableMenu {...menuData} {...menuHandlers} items={arr} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
