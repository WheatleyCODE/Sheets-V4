import { FC } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@/shared/lib/hooks';

let modals: null | HTMLElement = null;

export const Portal: FC<FCProps> = ({ children }) => {
  const { theme } = useTheme();

  if (!modals) {
    modals = document.querySelector('#modals');
    if (!modals) throw new Error('The modals element does not exist in the html document');
  }

  modals.classList.remove(...modals.classList);
  modals.classList.add('app');
  modals.dataset.testid = 'portal';
  modals.classList.add(theme);

  return createPortal(children, modals);
};
