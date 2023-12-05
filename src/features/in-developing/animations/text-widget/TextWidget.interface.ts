import { MotionProps } from 'framer-motion';

export interface ITextWidgetProps extends MotionProps {
  linesCount?: number;
  firstLetter?: string;
  className?: string;
  delayLinesAnimation?: number;
}
