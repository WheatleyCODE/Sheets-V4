import { useTheme } from 'app/providers';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Portal: FC<FCProps> = ({ children }) => {
  const { theme } = useTheme();
  const el = document.createElement('div');

  el.classList.add('app');
  el.classList.add(theme);

  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return createPortal(children, el);
};
