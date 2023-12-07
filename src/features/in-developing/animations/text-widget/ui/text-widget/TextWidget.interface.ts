import { MotionProps } from 'framer-motion';

export interface ITextWidgetProps extends MotionProps {
  isLastShort?: boolean;
  linesCount?: number;
  firstLetter?: string;
  className?: string;
  delayLinesAnimation?: number;
}
