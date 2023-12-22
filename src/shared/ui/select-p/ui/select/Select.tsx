// import { FC, memo } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { classNames } from '@/shared/lib/class-names';
// import { Input } from '../../../input';
// import type { ISelectProps } from './Select.interface';
// import styles from './Select.module.scss';
// import { intoIter } from '@/shared/lib/iterators';
// import { ANIMATION_DURATION } from '@/shared/consts';
// import { ControllableMenu, IControllableMenuItem } from '../../../controllable-menu';

// export const Select: FC<ISelectProps> = memo((props) => {
//   const {
//     className,
//     itemsViewCount,
//     isSearch,
//     Icon,
//     placeholder,
//     items,
//     isForbidInput,
//     isReadonly,
//     input,
//     select,
//     controllableMenu,
//     ...anotherProps
//   } = props;

//   let itemsArr = intoIter<IControllableMenuItem>(items);

//   if (isSearch) {
//     itemsArr = itemsArr.filter((item) => item.text.toLowerCase().includes(input.data.value.toLowerCase()));
//   }

//   const arr = itemsArr.toArray();

//   return (
//     <div {...anotherProps} data-testid="select" className={classNames(styles.select, {}, [className])}>
//       <Input
//         Icon={Icon}
//         type="text"
//         placeholder={placeholder}
//         data-testid="selectInput"
//         isReadonly={isReadonly}
//         {...input.data}
//         {...input.handlers}
//         onChange={isForbidInput ? () => {} : input.handlers.onChange}
//       />

//       <AnimatePresence>
//         {select.data.isShow && (
//           <motion.div
//             className={styles.select_menu}
//             initial={{ height: 0 }}
//             animate={{ height: 'auto' }}
//             exit={{ height: 0 }}
//             transition={{ duration: ANIMATION_DURATION }}
//           >
//             <ControllableMenu
//               itemsViewCount={itemsViewCount}
//               onSelectItem={select.data.selectItemAndClose}
//               {...controllableMenu.data}
//               {...controllableMenu.handlers}
//               items={arr}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });
