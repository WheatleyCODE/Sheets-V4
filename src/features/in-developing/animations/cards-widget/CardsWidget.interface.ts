import { MotionProps } from 'framer-motion';

export interface ICardsWidgetProps extends MotionProps {
  className?: string;
  delayLinesAnimation?: number;
  linesCount?: number;
  isLastShort?: boolean;
}
