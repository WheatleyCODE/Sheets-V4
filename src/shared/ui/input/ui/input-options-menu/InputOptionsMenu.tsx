import { CSSProperties, forwardRef } from 'react';
import { INPUT_OPTIONS_MENU_ITEM_HEIGHT } from '../input-options-menu-item/InputOptionsMenuItem';
import { motion } from 'framer-motion';
import { classNames } from 'shared/lib/class-names';
import styles from './InputOptionsMenu.module.scss';

export const INPUT_OPTIONS_MENU_PADDING = 10;

interface IInputOptionsMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  maxItems?: number;
  style?: CSSProperties;
}

export const InputOptionsMenu = forwardRef<HTMLDivElement, IInputOptionsMenuProps>((props, ref) => {
  const { className, children, style, maxItems = 4, ...anotherProps } = props;

  const maxHeight = maxItems * INPUT_OPTIONS_MENU_ITEM_HEIGHT + INPUT_OPTIONS_MENU_PADDING * 2;

  return (
    <div
      {...anotherProps}
      ref={ref}
      style={{
        ...style,
        maxHeight: maxHeight,
      }}
      className={classNames(styles.menu, {}, [className])}
    >
      <div
        data-testid="inputOptionsMenu"
        style={{ paddingTop: INPUT_OPTIONS_MENU_PADDING, paddingBottom: INPUT_OPTIONS_MENU_PADDING }}
      >
        {children}
      </div>
    </div>
  );
});

export const MInputOptionsMenu = motion(InputOptionsMenu);
