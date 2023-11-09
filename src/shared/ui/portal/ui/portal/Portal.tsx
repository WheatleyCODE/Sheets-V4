import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from 'app/providers/lib';

export const Portal: FC<FCProps> = ({ children }) => {
  const { theme } = useTheme();
  const el = document.createElement('div');

  el.classList.add('app');
  el.dataset.testid = 'portal';
  el.classList.add(theme);

  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return createPortal(children, el);
};
