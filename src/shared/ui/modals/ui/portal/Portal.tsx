import { FC } from 'react';
import { createPortal } from 'react-dom';

export const Portal: FC<FCProps> = ({ children }) => {
  return createPortal(children, document.body);
};
