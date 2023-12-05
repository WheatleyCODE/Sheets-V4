import { MotionProps } from 'framer-motion';
import { IconType } from 'react-icons';

export interface ITabsWidgetNameProps extends MotionProps {
  onClick?: () => void;
  className?: string;
  isActive: boolean;
  Icon: IconType;
}
