import { FC, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { classNames } from '@/shared/lib/class-names';
import { Input, useValidInput } from '../../../input';
import type { ISelectItem, ISelectProps } from './Select.interface';
import styles from './Select.module.scss';
import { intoIter } from '@/shared/lib/iterators';
import { SelectItem } from '../select-item/SelectItem';
import { ANIMATION_DURATION } from '@/shared/consts';
import { SELECT_MENU_ITEM_HEIGHT, SELECT_MENU_PADDING } from './Select.consts';

export const Select: FC<ISelectProps> = (props) => {
  const { className, itemsViewCount = 4, isSearch, Icon, items, isForbidInput, isReadonly, ...anotherProps } = props;

  const { data, handlers } = useValidInput('');

  const changeText = useCallback(
    (text: string) => {
      data.changeValue(text);
    },
    [data],
  );

  let itemsArr = intoIter<ISelectItem>(items);

  if (isSearch) {
    itemsArr = itemsArr.filter((item) => item.text.toLowerCase().includes(data.value.toLowerCase()));
  }

  const itemsArrJsx = itemsArr.map((item) => <SelectItem changeText={changeText} item={item} />).toArray();

  const maxHeight = itemsViewCount * SELECT_MENU_ITEM_HEIGHT + SELECT_MENU_PADDING * 2;

  return (
    <div {...anotherProps} data-testid="select" className={classNames(styles.select, {}, [className])}>
      <Input
        Icon={Icon}
        type="text"
        placeholder={'placeholder'}
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
              {itemsArrJsx.length > 1 ? itemsArrJsx : <div></div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
