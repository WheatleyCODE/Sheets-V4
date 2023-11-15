import { MotionProps } from 'framer-motion';
import { DrawerOpenStyles } from './Drawer.consts';

export interface IDrawerProps extends MotionProps {
  children?: React.ReactNode;
  openStyles: DrawerOpenStyles;
  width?: number;
  isFull?: boolean;
}
