import { useCallback, useMemo, useState } from 'react';
import type { UseHoverResult } from './useHover.interface';

export const useHover = (): UseHoverResult => {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return useMemo(
    () => [
      isHover,
      {
        onMouseEnter,
        onMouseLeave,
      },
    ],
    [isHover, onMouseEnter, onMouseLeave],
  );
};
