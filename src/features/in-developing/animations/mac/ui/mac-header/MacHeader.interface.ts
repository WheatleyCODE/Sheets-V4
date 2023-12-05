import { MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

export interface IMacHeaderProps extends MotionProps {
  className?: string;
  children: ReactNode;
}
