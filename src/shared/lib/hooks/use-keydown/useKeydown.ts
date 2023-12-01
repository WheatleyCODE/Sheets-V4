import { useEffect } from 'react';
import { intoIter } from '../../iterators';
import { EventHandler, KeyboardKeys, UseKeydownOpts } from './useKeydown.interface';

export const useKeydown = (opts: UseKeydownOpts) => {
  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      const iter = intoIter<[KeyboardKeys, EventHandler[]]>(opts, 'entries');

      for (const [key, handlers] of iter) {
        if (e.key === key) handlers.forEach((handler) => handler(e));
      }
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [opts]);
};
