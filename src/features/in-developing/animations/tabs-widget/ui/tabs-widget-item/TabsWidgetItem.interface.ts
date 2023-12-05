import { MotionProps } from 'framer-motion';
import { IconType } from 'react-icons';

export interface ITabsWidgetItemProps extends MotionProps {
  onClick?: () => void;
  className?: string;
  Icon: IconType;
}
