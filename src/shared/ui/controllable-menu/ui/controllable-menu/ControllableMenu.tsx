// import { FC, useEffect, useRef } from 'react';
// import { classNames } from '@/shared/lib/class-names';
// import type { IControllableMenuProps } from './ControllableMenu.interface';
// import styles from './ControllableMenu.module.scss';
// import { intoIter } from '@/shared/lib/iterators';
// import { ControllableMenuItem } from '../controllable-menu-item/ControllableMenuItem';
// import type { IControllableMenuItem } from '../controllable-menu-item/ControllableMenuItem.interface';
// import { extractUseControllableMenuProps } from './ControllableMenu.hooks';
// import { CONTROLLABLE_MENU_ITEM_HEIGHT, CONTROLLABLE_MENU_PADDING } from './ControllableMenu.consts';

// export const ControllableMenu: FC<IControllableMenuProps> = (props) => {
//   const [props1, data, handlers] = extractUseControllableMenuProps(props);
//   const ref = useRef<HTMLDivElement | null>(null);
//   const { className, items, onSelectItem, itemsViewCount = 4, ...anotherProps } = props1;
//   const { changeCurrentIndex, currentIndex } = data;

//   const itemsJsx = intoIter<IControllableMenuItem>(items)
//     .enumerate()
//     .map(([item, i]) => (
//       <ControllableMenuItem
//         onSelectItem={onSelectItem}
//         changeCurrentIndex={changeCurrentIndex}
//         isActive={i === currentIndex}
//         key={item.text}
//         item={item}
//       />
//     ))
//     .toArray();

//   const maxHeight = itemsViewCount * CONTROLLABLE_MENU_ITEM_HEIGHT + CONTROLLABLE_MENU_PADDING * 2;

//   useEffect(() => {
//     if (!ref.current) return;

//     const currentHeight = (data.currentIndex + 1) * CONTROLLABLE_MENU_ITEM_HEIGHT;

//     console.log(maxHeight, currentHeight);

//     if (maxHeight <= currentHeight) {
//       ref.current.scrollTop = CONTROLLABLE_MENU_ITEM_HEIGHT * (data.currentIndex + 1 - itemsViewCount);
//     } else {
//       ref.current.scrollTop = 0;
//     }
//   }, [data.currentIndex]);

//   return (
//     <div
//       {...anotherProps}
//       {...handlers}
//       ref={ref}
//       data-testid="controllableMenu"
//       style={{ maxHeight, paddingTop: CONTROLLABLE_MENU_PADDING, paddingBottom: CONTROLLABLE_MENU_PADDING }}
//       className={classNames(styles.controllable_menu, {}, [className])}
//     >
//       {itemsJsx}
//     </div>
//   );
// };
